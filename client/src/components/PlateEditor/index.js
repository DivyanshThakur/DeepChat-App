import React, { useState } from "react";
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  Plate,
} from "@udecode/plate";
import { CONFIG } from "./config";
import { VALUES } from "./value";

const PlateEditor = ({ chatId }) => {
  const [value, setValue] = useState(null);

  const onChangeValue = (newValue) => {
    setValue(newValue);
  };

  // const plugins = createPlugins(
  //   [
  //     // elements
  //     createParagraphPlugin(), // paragraph element
  //     createBlockquotePlugin(), // blockquote element
  //     createCodeBlockPlugin(), // code block element
  //     createHeadingPlugin(), // heading elements

  //     // marks
  //     createBoldPlugin(), // bold mark
  //     createItalicPlugin(), // italic mark
  //     createUnderlinePlugin(), // underline mark
  //     createStrikethroughPlugin(), // strikethrough mark
  //     createCodePlugin(), // code mark
  //   ],
  //   {
  //     // Plate components
  //     components: createPlateUI(),
  //   }
  // );

  let components = createPlateUI();
  // components = withStyledPlaceHolders(components);

  const plugins = createPlugins(
    [
      createParagraphPlugin(),
      createBlockquotePlugin(),
      // createTodoListPlugin(),
      createHeadingPlugin(),
      // createImagePlugin(),
      // createHorizontalRulePlugin(),
  //     createLineHeightPlugin(CONFIG.lineHeight),
  //     createLinkPlugin(),
  //     createListPlugin(),
  //     createTablePlugin(),
  //     createMediaEmbedPlugin(),
  //     createExcalidrawPlugin(),
  //     createCodeBlockPlugin(),
  //     createAlignPlugin(CONFIG.align),
  //     createBoldPlugin(),
  //     createCodePlugin(),
  //     createItalicPlugin(),
  //     createHighlightPlugin(),
  //     createUnderlinePlugin(),
  //     createStrikethroughPlugin(),
  //     createSubscriptPlugin(),
  //     createSuperscriptPlugin(),
  //     createFontBackgroundColorPlugin(),
  //     createFontFamilyPlugin(),
  //     createFontColorPlugin(),
  //     createFontSizePlugin(),
  //     createFontWeightPlugin(),
  //     createKbdPlugin(),
  //     createNodeIdPlugin(),
  //     createIndentPlugin(CONFIG.indent),
  //     createAutoformatPlugin(CONFIG.autoformat),
  //     createResetNodePlugin(CONFIG.resetBlockType),
  //     createSoftBreakPlugin(CONFIG.softBreak),
  //     createExitBreakPlugin(CONFIG.exitBreak),
  //     createNormalizeTypesPlugin(CONFIG.forceLayout),
  //     createTrailingBlockPlugin(CONFIG.trailingBlock),
  //     createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  //     createComboboxPlugin(),
  //     createMentionPlugin(),
  //     createDeserializeMdPlugin(),
  //     createDeserializeCsvPlugin(),
  //     createDeserializeDocxPlugin(),
  //     createJuicePlugin(),
    ],
    {
      components,
    }
  );

  return (
    <Plate
      id={chatId}
      editableProps={CONFIG.editableProps}
      initialValue={VALUES.initialValue}
      onChange={onChangeValue}
      plugins={plugins}
    >
      {/* <HeadingToolbar>
        <BasicElementToolbarButtons />
        <ListToolbarButtons />
        <IndentToolbarButtons />
        <BasicMarkToolbarButtons />
        <ColorPickerToolbarDropdown
          pluginKey={MARK_COLOR}
          icon={<FormatColorText />}
          selectedIcon={<Check />}
          tooltip={{ content: "Text color" }}
        />
        <ColorPickerToolbarDropdown
          pluginKey={MARK_BG_COLOR}
          icon={<FontDownload />}
          selectedIcon={<Check />}
          tooltip={{ content: "Highlight color" }}
        />
        <AlignToolbarButtons />
        <LineHeightToolbarDropdown icon={<LineWeight />} />
        <LinkToolbarButton icon={<Link />} />
        <ImageToolbarButton icon={<Image />} />
        <MediaEmbedToolbarButton icon={<OndemandVideo />} />
        <TableToolbarButtons />
      </HeadingToolbar>

      <BallonToolbarMarks />

      <MentionCombobox items={CONFIG.mentionItems} /> */}
    </Plate>
  );
};

export default PlateEditor;
