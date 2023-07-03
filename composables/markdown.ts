import { EditorView } from "codemirror";
import { Text, EditorSelection, EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
function inserString(
  view: EditorView,
  before: string = "",
  after: string = ""
) {
  const state = view?.state as EditorState;
  // console.log(state)
  const tr = state.update(
    state.changeByRange((range) => {
      const boffest = before.length;
      const aoffest = after.length;
      const changes = [];
      let rangeStart = range.from;
      let rangeEnd = range.to;
      rangeStart = rangeStart + boffest;
      rangeEnd = rangeEnd + aoffest;
      changes.push(
        {
          from: range.from,
          insert: Text.of([before]),
        },
        {
          from: range.to,
          insert: Text.of([after]),
        }
      );
      return {
        changes,
        range: EditorSelection.range(rangeStart, rangeStart),
      };
    })
  );
  view.dispatch(tr);
  view.focus();
  return true;
}

function insertCodeBlock(
  view: EditorView,
  before: string = "",
  after: string = ""
) {
  const state = view?.state as EditorState;
  const line = state.doc.lineAt(state.selection.main.from);
  // const lineContents = state.sliceDoc(line.from, line.to);
  // console.log(state.doc.lineAt(line.to + 1), state.lineBreak);
  const tr = state.update(
    state.changeByRange((range) => {
      const boffest = before.length;
      const aoffest = after.length;
      const changes = [];
      let rangeStart = range.from;
      let rangeEnd = range.to;
      rangeStart = rangeStart + boffest + 2;
      rangeEnd = rangeEnd + aoffest;
      changes.push(
        {
          from: range.from,
          insert: state.lineBreak + before + state.lineBreak,
        },
        {
          from: range.to,
          insert: state.lineBreak + after + state.lineBreak,
        }
      );
      return {
        changes,
        range: EditorSelection.range(rangeStart, rangeStart),
      };
    })
  );
  view.dispatch(tr);
  view.focus();
  return true;
}
function toggleString(view: EditorView, insertCode: string = "**") {
  const state = view.state as EditorState;
  // console.log(state)
  const tr = state.update(
    state.changeByRange((range) => {
      const offest = insertCode.length;
      const offestText = state.sliceDoc(range.from - offest, range.to + offest);
      const changes = [];
      const isStart = offestText.startsWith(insertCode);
      const isEnded = offestText.endsWith(insertCode);
      let rangeStart = range.from;
      let rangeEnd = range.to;
      if (isStart || isEnded) {
        let selectedText = state.sliceDoc(range.from, range.to);
        changes.push({
          from: isStart ? rangeStart - offest : rangeStart,
          insert: selectedText,
          to: isEnded ? rangeEnd + offest : rangeEnd,
        });
        if (isStart) {
          rangeStart = rangeStart - offest;
          rangeEnd = rangeStart + selectedText.length;
        }
      } else {
        rangeStart = rangeStart + offest;
        rangeEnd = rangeEnd + offest;
        changes.push(
          {
            from: range.from,
            insert: Text.of([insertCode]),
          },
          {
            from: range.to,
            insert: Text.of([insertCode]),
          }
        );
      }

      return {
        changes,
        range: EditorSelection.range(rangeStart, rangeEnd),
      };
    })
  );

  view.dispatch(tr);
  return true;
}

const insertBefore = (view: EditorView, insertCode: string = "#") => {
  const state = view.state as EditorState;
  const line = state.doc.lineAt(state.selection.main.from);
  const lineContents = state.sliceDoc(line.from, line.to);
  const isStart = lineContents.startsWith(insertCode);
  const unit = insertCode.substring(0, 1);
  const bfLeng = lineContents.length;
  const offest = insertCode.length + 1;
  // console.log(state)
  const tr = state.update(
    state.changeByRange((range) => {
      let rangeStart = range.from + offest;
      let rangeEnd = range.to + offest;
      const changes = [];
      let newText =
        insertCode + " " + lineContents.replace(/^[#|>|*|\-|(\d*\.)]{0,} /, "");

      if (isStart) {
        newText = lineContents.replace(/^[#|>|\*|\-|(\d*\.)]{0,} /, "");
      }
      const afLeng = newText.length;
      rangeStart = range.from - (bfLeng - afLeng);
      rangeEnd = range.to - (bfLeng - afLeng);
      changes.push({
        from: line.from,
        to: line.to,
        insert: newText,
      });
      return {
        changes,
        range: EditorSelection.range(rangeStart, rangeEnd),
      };
    })
  );

  view.dispatch(tr);
  view.focus();
  return true;
};

export const useMarkdown = () => {
  const toggleBold = (view: EditorView) => {
    return toggleString(view, "**");
  };
  const toggleItalic = (view: EditorView) => {
    return toggleString(view, "***");
  };
  const setH1 = (view: EditorView) => {
    return insertBefore(view, "#");
  };
  const setH2 = (view: EditorView) => {
    return insertBefore(view, "##");
  };
  const setH3 = (view: EditorView) => {
    return insertBefore(view, "###");
  };
  const setNumberList = (view: EditorView) => {
    return insertBefore(view, "1.");
  };
  const setGenericList = (view: EditorView) => {
    return insertBefore(view, "-");
  };
  const setQuote = (view: EditorView) => {
    return insertBefore(view, ">");
  };
  const setImage = (view: EditorView) => {
    return inserString(view, "![", "](https://)");
  };
  const setLink = (view: EditorView) => {
    return inserString(view, "[", "](https://)");
  };
  const setCodeBlock = (view: EditorView) => {
    return insertCodeBlock(view, "```javascript", "```");
  };
  const keymaps = keymap.of([
    {
      key: "Ctrl-Shift-8",
      run: setGenericList,
    },
    {
      key: "Ctrl-e",
      run: setCodeBlock,
    },
    {
      key: "Ctrl-k",
      run: setLink,
    },
    {
      key: "Ctrl-Shift-9",
      run: setNumberList,
    },
    {
      key: "Ctrl-Shift-.",
      run: setQuote,
    },
    {
      key: "Ctrl-b",
      run: toggleBold,
    },
    {
      key: "Shift-i",
      run: toggleItalic,
    },
    // {
    //   key: "Ctrl-Shift-8",
    //   run: setGenericList,
    // },
  ]);
  return {
    keymaps,
    toggleBold,
    toggleItalic,
    setH1,
    setH2,
    setH3,
    setImage,
    setLink,
    setNumberList,
    setQuote,
    setGenericList,
    setCodeBlock,
  };
};
