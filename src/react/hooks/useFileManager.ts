import { useContext } from 'react';
import { FileManagerContext } from '../contexts/FileManagerContext';
import { PanelContext } from '../contexts/PanelContext';
import * as RtfParser from 'rtf-parser';
import { read, spawnFileDialog } from '../../electron/ipc';
import mammoth from 'mammoth';
import fs from 'fs/promises';

export function processRTFContent(rtfContent: string): string {
    return rtfContent.replace(/(\\u-?\d+)((?:\s*\\'[0-9a-fA-F]{2})?)(\s*[\-\?])?/g, (match, unicodeControlWord, offset) => {
        if (offset > 0 && rtfContent[offset - 1] === '\\') {
            return match;
        }
        return unicodeControlWord;
    })
    .replace(/\\'[0-9a-fA-F]{2}/g, '')
    .replace(/(\s?\\u-?\d+)\s*[\-\?]/g, '$1')
    .replace(/\\u-?\d+\s*-\s+/g, '$&').trim();
}

export function trimWhitespace(str: string) {
  return str.replace(/^ +| +$/g, '');
}

export function getRtfDocument(content: string | Buffer | undefined) {
    return new Promise((resolve, reject) => {
        RtfParser.string(processRTFContent(content.toString()),  (err: any, doc: { content: any[]; }) => {
            if (err) reject(err);
            else resolve(doc);
          },
        );
    })
}

export const loadRtfFile = async (filePath: string): Promise<any> => {
    let content;

    try {
        content = await read(filePath, 'utf8');
        let doc: any = await getRtfDocument(content);
        let paragraphs = doc.content.map((paragraph: { content: any[]; }) => paragraph.content.flatMap((entry: { value: any; }) => entry.value));
        let text: string[] = paragraphs.reduce((acc: string[], paragraph: string[]) => {
            if (paragraph.length === 0) {
                acc.push("\n");
                } else {
                const lines = paragraph.map(elem => trimWhitespace(elem).replace('','')).join(" ");
                acc.push(lines);
            }
            return acc;
        }, []);

        return text.join('');
    } catch (error) {
        return undefined;
    }
};

export const promptAndLoadFileHelper = async (addNew: Function, setTextContent: Function, setCurWordSequenceIndex: Function) => {
    let filePath;
    try {
        filePath = await spawnFileDialog();
    } catch (error) {
        console.error(error);
        return;
    }

    if (!filePath) {
        return;
    }

    const fileExtension = filePath.split('.').pop() || undefined;

    let content;
    switch (fileExtension) {
        case "rtf":
            content = await loadRtfFile(filePath);
            break;
        case "txt":
            break;
        case "docx":
            break;
        case "pdf":
            break;
        default:
            console.log("Unsupported file found!");
            break;
    }

    if (!content) {
        return;
    }

    addNew(filePath);
    setTextContent(content);
    setCurWordSequenceIndex(0);
};

const loadTxtFile = async (filePath: string): Promise<string | undefined> => {
    return await read(filePath, "utf8");
};

//---mml

const loadDocxFile = async (filePath: string) => {
    const data = await fs.readFile(filePath);
    return data;
};

const convertToHtml = async (arrayBuffer: Buffer) => {
    const result = await mammoth.convertToHtml({arrayBuffer: arrayBuffer});
    return result.value; // The generated HTML
};

const parseLines = (html: string) => {
    const text = html.replace(/<br>/g, '\n').replace(/<\/p>/g, '\n');
    return text.split('\n');
};

const wordReader = async (filePath: string) => {
    const arrayBuffer = await loadDocxFile(filePath);
    const html = await convertToHtml(arrayBuffer);
    const lines = parseLines(html);
    console.log(lines);
};

//--mml

const loadPdfFile = async (filePath: string) => {
    
};

export const useFileManager = () => {
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext);
    const { setTextContent, setCurWordSequenceIndex, textContent } = useContext(PanelContext);

    const handleAddNew = (filePath: string) => {
        const files = [...currentFiles, filePath];
        setCurrentFiles(files);
    };

    const promptAndLoadFile = async () => {
        await promptAndLoadFileHelper(handleAddNew, setTextContent, setCurWordSequenceIndex);
    };

    return {
        promptAndLoadFile,
    }
};
