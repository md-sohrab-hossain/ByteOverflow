'use client';

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  ListsToggle,
  tablePlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import { basicDark } from 'cm6-theme-basic-dark';
import { useTheme } from 'next-themes';
import { Ref } from 'react';

import '@mdxeditor/editor/style.css';
import './dark-editor.css';

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: Ref<MDXEditorMethods> | null;
}

const Editor = ({ value, editorRef, fieldChange }: Props) => {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === 'dark' ? [basicDark] : [];

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border"
      onChange={fieldChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            plaintext: 'plaintext',
            css: 'css',
            txt: 'txt',
            sql: 'sql',
            html: 'html',
            saas: 'saas',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            javascript: 'javascript',
            ts: 'typescript',
            typescript: 'typescript',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)',
            '': 'plaintext',
            'N/A': 'plaintext',
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: editor => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                      <InsertTable />
                      <CreateLink />
                      <ListsToggle />
                      <InsertThematicBreak />
                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  );
};

export default Editor;
