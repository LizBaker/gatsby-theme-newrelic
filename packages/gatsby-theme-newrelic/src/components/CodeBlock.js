import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import Button from './Button';
import CodeEditor from './CodeEditor';
import Icon from './Icon';
import CodeHighlight from './CodeHighlight';
import MiddleEllipsis from 'react-middle-ellipsis';
import useClipboard from '../hooks/useClipboard';
import useFormattedCode from '../hooks/useFormattedCode';

const defaultComponents = {
  Preview: LivePreview,
};

const CodeBlock = ({
  children,
  components: componentOverrides = {},
  copyable,
  fileName,
  formatOptions,
  highlightedLines,
  language,
  lineNumbers,
  live,
  preview,
  scope,
}) => {
  const components = { ...defaultComponents, ...componentOverrides };
  const formattedCode = useFormattedCode(children, formatOptions);
  const [copied, copy] = useClipboard();
  const [code, setCode] = useState(formattedCode);

  useEffect(() => {
    setCode(formattedCode);
  }, [formattedCode]);

  return (
    <LiveProvider code={code} scope={scope}>
      {preview && (
        <components.Preview
          css={css`
            padding: 2rem;
            background: var(--color-white);
            border: 1px solid var(--color-neutrals-100);
            box-shadow: var(--boxshadow);
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
          `}
        />
      )}
      <div
        css={css`
          background: var(--color-nord-0);
          border-radius: 4px;

          .light-mode & {
            background: var(--color-nord-6);
          }

          ${preview &&
          css`
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          `};
        `}
      >
        <div
          css={css`
            max-height: 26em;
            overflow: auto;
          `}
        >
          {live ? (
            <CodeEditor
              value={code}
              language={language}
              lineNumbers={lineNumbers}
              onChange={setCode}
            />
          ) : (
            <CodeHighlight
              highlightedLines={highlightedLines}
              language={language}
              lineNumbers={lineNumbers}
            >
              {code}
            </CodeHighlight>
          )}
        </div>
        {(copyable || fileName) && (
          <div
            css={css`
              color: var(--color-nord-6);
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: var(--color-nord-1);
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
              padding: 0 1rem;
              font-size: 0.75rem;

              .light-mode & {
                color: var(--color-nord-0);
                background: var(--color-nord-4);
              }
            `}
          >
            <div
              css={css`
                font-family: var(--code-font);
                white-space: nowrap;
                overflow: hidden;
                padding-right: 0.5rem;
              `}
            >
              {fileName && (
                <MiddleEllipsis>
                  <span title={fileName}>{fileName}</span>
                </MiddleEllipsis>
              )}
            </div>
            <Button
              type="button"
              variant={Button.VARIANT.PLAIN}
              onClick={() => copy(code)}
              size={Button.SIZE.SMALL}
              css={css`
                white-space: nowrap;
              `}
            >
              <Icon
                name={Icon.TYPE.COPY}
                css={css`
                  margin-right: 0.5rem;
                `}
              />
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        )}
      </div>
      {(live || preview) && (
        <LiveError
          css={css`
            color: white;
            background: var(--color-red-400);
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
            overflow: auto;
            margin-top: 0.5rem;
            border-radius: 2px;
          `}
        />
      )}
    </LiveProvider>
  );
};

CodeBlock.propTypes = {
  fileName: PropTypes.string,
  components: PropTypes.shape({
    Preview: PropTypes.elementType,
  }),
  copyable: PropTypes.bool,
  children: PropTypes.string.isRequired,
  formatOptions: PropTypes.object,
  highlightedLines: PropTypes.string,
  language: PropTypes.string,
  lineNumbers: PropTypes.bool,
  live: PropTypes.bool,
  preview: PropTypes.bool,
  scope: PropTypes.object,
};

CodeBlock.defaultProps = {
  copyable: true,
  lineNumbers: false,
  live: false,
  preview: false,
};

export default CodeBlock;
