import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import { PanelProvider, PanelContext } from '../../../src/react/contexts/PanelContext';
import nlp from 'compromise';
import { SettingsContext, SettingsProvider } from '../../../src/react/contexts/SettingsContext';

const text1 = `This is sentence 1. This is sentence 2.


This is paragraph 2. This is the first sentence. This is the second sentence.
`;

describe('generateWordSequenceIndicesFromIndex tests for text1', () => {
  test('generating word sequences with one word', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, "word", 0, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0]));
  });

  test('generating word sequences with one word and large word sequence size', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, "word", 0, 5);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0]));
  });

  test('generating word sequences at index 0', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 0, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences at index 5 (second word)', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 5, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences at index 60 (twelth word)', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 60, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences at index 103 (second to last word)', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 103, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences at index 110 (last word)', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 103, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences at last character index', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 119, 1);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0,5,8,17,20,25,28,37,42,47,50,60,63,68,71,75,81,91,96,99,103,110]));
  });

  test('generating word sequences with 5 words per sequence', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 0, 5);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0, 25, 50, 75, 103]));
  });

  test('generating new word sequences after we adjust word boundary to another paragraph', async () => {
      const TestComponent = () => {
          const { generateWordSequenceIndicesFromIndex } = useContext(PanelContext);
          const document = nlp(text1);
          const words = document.terms().out('offset');
          const oldIndices = generateWordSequenceIndicesFromIndex(words, text1, 0, 5);
          const indices = generateWordSequenceIndicesFromIndex(words, text1, 42, 5);

          return <div data-testid="indices">{JSON.stringify(indices)}</div>;
      };

      render(
          <PanelProvider>
              <TestComponent />
          </PanelProvider>
      );

      expect(await screen.findByTestId('indices')).toHaveTextContent(JSON.stringify([0, 17, 42, 68, 96]));
  });
});

const TestPanelContextComponent = () => {
  const { curWordSequence, textContent, setTextContent, isPlaying, setIsPlaying } = useContext(PanelContext);
  const { settings, dispatch } = useContext(SettingsContext);

  return (
    <div>
      <div data-testid="curWordSequence">{curWordSequence}</div>
      <div data-testid="textContent">{textContent}</div>
      <div data-testid="isPlaying">{isPlaying.toString()}</div>
      <button onClick={() => setTextContent('Updated text content for testing the word processing logic!')}>Update Text</button>
      <button onClick={() => setIsPlaying(!isPlaying)}>Toggle Playing</button>
      <button onClick={() => dispatch({type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: 3})}>Update Word Seq Length</button>
    </div>
  );
};

describe('PanelProvider', () => {
  test('renders children and provides default context values', () => {
    render(
      <PanelProvider>
        <TestPanelContextComponent />
      </PanelProvider>
    );

    expect(screen.getByTestId('curWordSequence')).toHaveTextContent('');
    expect(screen.getByTestId('textContent')).toHaveTextContent('');
    expect(screen.getByTestId('isPlaying')).toHaveTextContent('false');
  });


  test('update text content', () => {
    render(
      <PanelProvider>
        <TestPanelContextComponent />
      </PanelProvider>
    );

    act(() => {
      screen.getByText('Update Text').click();
    });

    expect(screen.getByTestId('curWordSequence')).toHaveTextContent('Updated');
    expect(screen.getByTestId('textContent')).toHaveTextContent('Updated text content for testing the word processing logic!');
  });

  test('update isPlaying value', () => {
    render(
      <PanelProvider>
        <TestPanelContextComponent />
      </PanelProvider>
    );

    act(() => {
      screen.getByText('Update Text').click();
      screen.getByText('Toggle Playing').click();
    });

    expect(screen.getByTestId('curWordSequence')).toHaveTextContent('Updated');
    expect(screen.getByTestId('textContent')).toHaveTextContent('Updated text content for testing the word processing logic!');
    expect(screen.getByTestId('isPlaying')).toHaveTextContent('true');
  });

  test('change word sequence length and update text content', async () => {
    render(
      <SettingsProvider>
        <PanelProvider>
          <TestPanelContextComponent />
        </PanelProvider>
      </SettingsProvider>
    );

    act(() => {
      screen.getByText('Update Text').click();
    });

    await waitFor(() => expect(screen.getByTestId('textContent')).toHaveTextContent('Updated text content for testing the word processing logic!'));

    act(() => {
      screen.getByText('Update Word Seq Length').click();
    });

    await waitFor(() => expect(screen.getByTestId('curWordSequence')).toHaveTextContent('Updated text content'));
  });

});
