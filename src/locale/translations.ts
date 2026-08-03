

import { en_lang } from "./langs/en";
import { zh_lang } from "./langs/zh";
// import romanizeString from "romanize-string";
export const translations: { [key: string]: { [key: string]: string } } = {
    en: en_lang,
    zh: zh_lang
};



// function detectScript(text: string): "ja" | "ko" | "zh-CN" | "unknown" {
//     if (/\p{Script=Hangul}/u.test(text)) return "ko";
//     if (/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(text)) return "ja";
//     if (/\p{Script=Han}/u.test(text)) return "zh-CN";
//     return "unknown";
// }

// export function romanize(text: string): string {
//     const script = detectScript(text);

//     switch (script) {
//         case "ja":
//         case "ko":
//         case "zh-CN":
//             romanizeString(text, script).then(v => v);
//         default:
//             return text;
//     }
// }

// // examples
// console.log(romanize("こんにちは"));
// console.log(romanize("안녕하세요"));
// console.log(romanize("你好"));
// console.log(romanize("東京"));
