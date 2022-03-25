import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  useSelected,
  useFocused,
} from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Range,
} from "slate";
import { withHistory } from "slate-history";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";
import EmojiPicker from "emoji-picker-react";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { Box, Divider, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SendIcon from "@material-ui/icons/Send";
import { Button, Icon, Toolbar } from "./components";
import useStyles from "./style";
import "./Compose.css";
import FileList from "./FileList";
import HyperLinkDialog from "../Dialog/HyperLinkDialog";
import serialize from "./searialize";
import protectedHandler from "../../utils/protectedHandler";
import { useSendMessageMutation } from "../../redux/api/message";
import LoadingIconButton from "../button/LoadingIconButton";
import notify from "../../utils/notify";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+x": "strike",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const Compose = ({ chatId }) => {
  const classes = useStyles();

  const [sendMessageToServer, { isLoading }] = useSendMessageMutation();

  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(`content-${chatId}`)) || initialValue
  );

  const [target, setTarget] = useState();
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showMentionList, setShowMentionList] = useState(false);
  const [files, setFiles] = useState([]);
  const [openLinkDialog, setOpenLinkDialog] = useState(false);

  const updateSelectedFile = (file, action) => {
    if (action === "add") {
      setFiles([...files, file]);
    } else {
      setFiles(files.filter(({ name }) => name !== file.name));
    }
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const inputFile = useRef(null);

  const editor = useMemo(
    () =>
      withLinks(
        withEmojis(withMentions(withHistory(withReact(createEditor()))))
      ),
    []
  );

  // useEffect(() => {
  //   Transforms.delete(editor, {
  //     at: {
  //       anchor: Editor.start(editor, []),
  //       focus: Editor.end(editor, []),
  //     },
  //   });
  //   return () =>
  //     Transforms.delete(editor, {
  //       at: {
  //         anchor: Editor.start(editor, []),
  //         focus: Editor.end(editor, []),
  //       },
  //     });
  // }, [editor]);

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onEmojiClick = (_event, emojiObject) => {
    setShowEmoji(false);
    insertEmoji(editor, emojiObject.emoji);
  };

  const handleLinkSave = (data) => {
    setOpenLinkDialog(false);
    insertHyperLink(editor, data);
    toggleMark(editor, "link");
  };

  const isEditorEmpty = (value) => {
    if (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    ) {
      return true;
    }
    return false;
  };

  const sendMessage = protectedHandler(async () => {
    const html = serialize(editor);

    if (isEditorEmpty(html) && files.length === 0) {
      return notify.error("EmptyText", "Empty text", 3000);
    }

    const formData = new FormData();

    files.forEach((file) => formData.append("files", file));
    formData.append("content", html);
    formData.append("chatId", chatId);

    await sendMessageToServer(formData).unwrap();

    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });

    setFiles([]);
  });

  return (
    <div className={classes.root}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);

          const { selection } = editor;
          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, {
              unit: "word",
            });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText =
              beforeRange && Editor.string(editor, beforeRange);
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange);
              setSearch(beforeMatch[1]);
              setIndex(0);
              return;
            }
          }

          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem(`content-${chatId}`, content);
          }

          setTarget(null);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon={FormatBoldIcon} />
          <MarkButton format="italic" icon={FormatItalicIcon} />
          <MarkButton format="strike" icon={StrikethroughSIcon} />
          <Divider className={classes.divider} />
          <MarkButton
            onMouseDown={() => setOpenLinkDialog(true)}
            format="link"
            icon={LinkIcon}
          />
          <Divider className={classes.divider} />
          <BlockButton format="numbered-list" icon={FormatListNumberedIcon} />
          <BlockButton format="bulleted-list" icon={FormatListBulletedIcon} />
          <Divider className={classes.divider} />
          <BlockButton format="block-quote" icon={FormatQuoteIcon} />
          <Divider className={classes.divider} />
          <MarkButton format="code" icon={CodeIcon} />
          {/* <MarkButton format="codeblock" icon={IntegrationInstructionsIcon} /> */}
        </Toolbar>
        <Editable
          className={classes.editable}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="DeepChat here..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }

            if (target || showMentionList) {
              switch (event.key) {
                case "ArrowDown":
                  event.preventDefault();
                  const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
                  setIndex(prevIndex);
                  break;
                case "ArrowUp":
                  event.preventDefault();
                  const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
                  setIndex(nextIndex);
                  break;
                case "Tab":
                case "Enter":
                  event.preventDefault();
                  Transforms.select(editor, target);
                  insertMention(editor, chars[index]);
                  setTarget(null);
                  setShowMentionList(false);
                  break;
                case "Escape":
                  event.preventDefault();
                  setTarget(null);
                  setShowMentionList(false);
                  break;
                default:
                  break;
              }
            }
          }}
        />
        <FileList
          files={files}
          onDelete={(file) => updateSelectedFile(file, "delete")}
        />
        <Box display="flex">
          <IconButton
            size="small"
            onMouseDown={() => inputFile.current.click()}
          >
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e) => updateSelectedFile(e.target.files[0], "add")}
            />

            <AddCircleOutlineIcon />
          </IconButton>
          <Divider className={classes.divider} />
          <div style={{ position: "relative" }}>
            <IconButton
              onMouseDown={() => setShowEmoji(!showEmoji)}
              size="small"
            >
              <InsertEmoticonIcon />
            </IconButton>
            <div
              className={classes.emojiPicker}
              style={{ display: showEmoji ? "block" : "none" }}
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <IconButton
              size="small"
              onMouseDown={(event) => {
                event.preventDefault();
                setShowMentionList(!showMentionList);
              }}
            >
              <AlternateEmailIcon />
            </IconButton>
            {(showMentionList || (target && chars.length > 0)) && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 1,
                  bottom: "2rem",
                  padding: "3px",
                  width: "10rem",
                  background: "white",
                  borderRadius: "4px",
                  boxShadow: "0 1px 5px rgba(0,0,0,.2)",
                }}
              >
                {chars?.map((char, i) => (
                  <div
                    key={char}
                    className={classes.atList}
                    style={{
                      padding: "1px 3px",
                      borderRadius: "3px",
                      background: i === index ? "#B4D5FF" : "transparent",
                      cursor: "pointer",
                    }}
                    onMouseDown={() => {
                      Transforms.select(editor, target);
                      insertMention(editor, char);
                      setShowMentionList(false);
                    }}
                  >
                    {char}
                  </div>
                ))}
              </div>
            )}
          </div>
          <LoadingIconButton
            size="small"
            variant="contained"
            color="primary"
            className={classes.sendButton}
            icon={<SendIcon />}
            onClick={sendMessage}
            isLoading={isLoading}
          >
            Send
          </LoadingIconButton>
        </Box>
        <HyperLinkDialog
          open={openLinkDialog}
          onClose={() => setOpenLinkDialog(false)}
          onSave={handleLinkSave}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const withMentions = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};

const withEmojis = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "emoji" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "emoji" ? true : isVoid(element);
  };

  return editor;
};

const withLinks = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "link" ? true : isVoid(element);
  };

  return editor;
};

const insertHyperLink = (editor, { url, text }) => {
  const hyperlink = {
    type: "link",
    url,
    children: [{ text }],
  };
  Transforms.insertNodes(editor, hyperlink);
  Transforms.move(editor);
};

const insertMention = (editor, character) => {
  const mention = {
    type: "mention",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const insertEmoji = (editor, character) => {
  const emoji = {
    type: "emoji",
    character,
    children: [{ text: "" }],
  };
  Transforms.insertNodes(editor, emoji);
  Transforms.move(editor);
};

const Element = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "mention":
      return <Mention {...props} />;
    case "emoji":
      return <Emoji {...props} />;
    case "link":
      return <Link {...props} />;
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(" ", "-")}`}
      style={{
        padding: "0.1rem 0.3rem",
        margin: "0 0.3rem",
        verticalAlign: "baseline",
        display: "inline-block",
        color: "blue",
        borderRadius: "1rem",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none",
      }}
    >
      @{element.character}
      {children}
    </span>
  );
};

const Emoji = ({ attributes, children, element }) => {
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`emoji-${element.character.replace(" ", "-")}`}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
      }}
    >
      {element.character}
      {children}
    </span>
  );
};

const Link = ({ attributes, children, element }) => {
  return (
    <span
      {...attributes}
      onClick={(e) => {
        const linkElement = document.createElement("a");
        if (linkElement && e.ctrlKey) {
          const href = element.url;
          window.open(href, "_blank");
        }
      }}
      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
    >
      {element.children[0].text}
      {children}
    </span>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.strike) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon: MuiIcon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{<MuiIcon />}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon: MuiIcon, onMouseDown: omd }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={
        omd
          ? omd
          : (event) => {
              event.preventDefault();
              toggleMark(editor, format);
            }
      }
    >
      <Icon>{<MuiIcon />}</Icon>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const CHARACTERS = [
  "Aayla Secura",
  "Adi Gallia",
  "Admiral Dodd Rancit",
  "Admiral Firmus Piett",
  "Admiral Gial Ackbar",
  "Admiral Ozzel",
];

export default Compose;
