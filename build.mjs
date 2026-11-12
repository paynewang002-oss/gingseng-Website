import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://changbaishanginseng.com';
const languages = [
  { code: 'en', path: '/', label: 'English' },
  { code: 'ja', path: '/ja/', label: '日本語' },
  { code: 'ko', path: '/ko/', label: '한국어' },
  { code: 'zh-Hans', path: '/zh-hans/', label: '简体中文' },
  { code: 'zh-Hant', path: '/zh-hant/', label: '繁體中文' }
];

const content = {
  en: {
    title: 'Changbai Mountain & Ginseng',
    description: 'Discover Changbai Mountain, its forests and the ginseng tradition of Northeast China. A simple introduction to Panax ginseng and its origins.',
    brand: 'Changbaishan Ginseng', nav: 'Discover the region',
    heading: 'Discover Changbai Mountain and ginseng',
    intro: 'Get to know Changbai Mountain and the ginseng rooted in its landscape and culture.',
    explore: 'Discover Changbai', lake: 'Tianchi, the crater lake of Changbai Mountain',
    placeTitle: 'Where the story takes root',
    place: 'In Northeast China, the Changbai Mountain region brings together mountain landscapes, forests and a long tradition of ginseng cultivation. Jilin’s ginseng-growing areas include Baishan, Tonghua and Yanbian.',
    history: 'In the Changbai Mountain region, ginseng cultivation has a history of more than 450 years, according to the Jilin provincial government.',
    plantTitle: 'Meet the plant behind the name',
    plant: 'Panax ginseng is a perennial plant in the Araliaceae family. Its native range includes Northeast China, the Korean Peninsula and the Russian Far East. It is known for its branching root, green leaves and red fruit.',
    plantCaption: 'A ginseng plant photographed in Changbai Mountain',
    noteTitle: 'Start with origin',
    note: 'A useful introduction to ginseng starts with the plant and the place it comes from. Species, growing environment and processing method each help describe what you are looking at.',
    sourceTitle: 'Sources & photography',
    sources: ['Ginseng-growing regions of Jilin', 'Ginseng cultivation in the Changbai Mountain region', 'Panax ginseng botanical record'],
    photos: 'Photography', mountainCredit: 'Tianchi by 颐园新居', plantCredit: 'Ginseng plant by Doge24190',
    photoNote: 'Images resized for display.', footer: 'An introduction to Changbai Mountain and ginseng.',
    language: 'Choose language', skip: 'Skip to content', contact: 'Contact us'
  },
  ja: {
    title: '長白山と高麗人参',
    description: '長白山の自然と中国東北部に根づく人参栽培の歴史を紹介します。人参の植物としての特徴と産地を知るための入門サイトです。',
    brand: '長白山と人参', nav: '産地を知る',
    heading: '長白山と人参を知る',
    intro: '長白山の風景と文化を通して、人参のふるさとを訪ねます。',
    explore: '長白山を知る', lake: '長白山の火口湖、天池',
    placeTitle: '人参の物語が根づく場所',
    place: '中国東北部の長白山地域には、山々や森林とともに、長い人参栽培の歴史があります。吉林省の人参産地には、白山、通化、延辺などがあります。',
    history: '吉林省政府の紹介によると、長白山地域における人参栽培の歴史は450年以上に及びます。',
    plantTitle: '人参という植物を知る',
    plant: 'Panax ginseng はウコギ科の多年草です。原産地は中国東北部、朝鮮半島、ロシア極東に広がります。枝分かれした根、緑の葉、赤い果実が特徴です。',
    plantCaption: '長白山で撮影された人参の植物',
    noteTitle: 'まず、産地から',
    note: '人参を知る入り口は、その植物と育った場所を知ることです。種類、生育環境、加工方法をひとつずつ見ることで、人参への理解が深まります。',
    sourceTitle: '出典と写真', sources: ['吉林省の人参産地', '長白山地域の人参栽培', 'Panax ginseng の植物情報'],
    photos: '写真', mountainCredit: '天池の写真 颐园新居', plantCredit: '人参の写真 Doge24190',
    photoNote: '表示用に画像サイズを調整しています。', footer: '長白山と人参を知るための入門サイト。',
    language: '言語を選択', skip: '本文へ移動', contact: 'お問い合わせ'
  },
  ko: {
    title: '창바이산과 인삼',
    description: '창바이산의 숲과 중국 동북 지역의 인삼 재배 문화를 만나보세요. 인삼의 식물학적 특징과 산지를 쉽게 소개합니다.',
    brand: '창바이산 인삼', nav: '산지 알아보기',
    heading: '창바이산과 인삼 알아보기',
    intro: '창바이산의 풍경과 문화를 통해 인삼의 고장을 알아봅니다.',
    explore: '창바이산 알아보기', lake: '창바이산 정상의 화구호, 천지',
    placeTitle: '인삼의 이야기가 뿌리내린 곳',
    place: '중국 동북부의 창바이산 지역에는 산과 숲, 그리고 오랜 인삼 재배의 역사가 함께합니다. 지린성의 인삼 산지에는 바이산, 퉁화, 옌볜 등이 있습니다.',
    history: '지린성 정부의 소개에 따르면, 창바이산 지역의 인삼 재배 역사는 450년 이상 이어져 왔습니다.',
    plantTitle: '인삼이라는 식물',
    plant: 'Panax ginseng은 두릅나무과의 여러해살이풀입니다. 자생지는 중국 동북부, 한반도와 러시아 극동에 걸쳐 있습니다. 갈라진 뿌리와 초록 잎, 붉은 열매가 특징입니다.',
    plantCaption: '창바이산에서 촬영한 인삼 식물',
    noteTitle: '산지부터 알아보기',
    note: '인삼을 이해하는 첫걸음은 식물과 그 식물이 자란 곳을 아는 것입니다. 종과 생육 환경, 가공 방법을 살펴보면 인삼을 더 잘 이해할 수 있습니다.',
    sourceTitle: '출처 및 사진', sources: ['지린성의 인삼 산지', '창바이산 지역의 인삼 재배', 'Panax ginseng 식물 정보'],
    photos: '사진', mountainCredit: '천지 사진 颐园新居', plantCredit: '인삼 사진 Doge24190',
    photoNote: '화면 표시에 맞게 이미지 크기를 조정했습니다.', footer: '창바이산과 인삼을 알아가는 안내서.',
    language: '언어 선택', skip: '본문으로 이동', contact: '문의하기'
  },
  'zh-Hans': {
    title: '长白山与人参',
    description: '从长白山的山林与风土出发，认识人参的植物特点、产地与悠久的栽培文化。',
    brand: '长白山人参', nav: '认识这片产地',
    heading: '认识长白山与人参',
    intro: '走近长白山的自然与文化，了解扎根于这片土地的人参。',
    explore: '认识长白山', lake: '长白山火山口湖天池',
    placeTitle: '人参故事扎根的地方',
    place: '在中国东北，长白山地区的山林与人参栽培传统相伴已久。吉林省的人参主产区包括白山、通化、延边等地。',
    history: '据吉林省政府介绍，长白山地区的人参人工栽培已有450多年的历史。',
    plantTitle: '先认识人参这种植物',
    plant: '人参的学名是 Panax ginseng，属于五加科多年生植物。其原生分布包括中国东北、朝鲜半岛与俄罗斯远东地区。分枝的根、绿色的叶与红色的果实，构成了它的植物形态。',
    plantCaption: '拍摄于长白山的人参植株',
    noteTitle: '从产地开始了解',
    note: '认识人参，可以先从植物本身与生长的地方开始。品种、生长环境与加工方式，都能帮助我们更具体地理解一支参。',
    sourceTitle: '资料来源与图片署名', sources: ['吉林省人参产区介绍', '长白山地区人参栽培历史', '人参植物分类资料'],
    photos: '图片', mountainCredit: '天池摄影 颐园新居', plantCredit: '人参摄影 Doge24190',
    photoNote: '图片已调整为网页显示尺寸。', footer: '一份关于长白山与人参的入门介绍。',
    language: '选择语言', skip: '跳转到正文', contact: '联系我们'
  },
  'zh-Hant': {
    title: '長白山與人參',
    description: '從長白山的山林與風土出發，認識人參的植物特點、產地與悠久的栽培文化。',
    brand: '長白山人參', nav: '認識這片產地',
    heading: '認識長白山與人參',
    intro: '走近長白山的自然與文化，了解紮根於這片土地的人參。',
    explore: '認識長白山', lake: '長白山火山口湖天池',
    placeTitle: '人參故事紮根的地方',
    place: '在中國東北，長白山地區的山林與人參栽培傳統相伴已久。吉林省的人參主產區包括白山、通化、延邊等地。',
    history: '據吉林省政府介紹，長白山地區的人參人工栽培已有450多年的歷史。',
    plantTitle: '先認識人參這種植物',
    plant: '人參的學名是 Panax ginseng，屬於五加科多年生植物。其原生分布包括中國東北、朝鮮半島與俄羅斯遠東地區。分枝的根、綠色的葉與紅色的果實，構成了它的植物形態。',
    plantCaption: '拍攝於長白山的人參植株',
    noteTitle: '從產地開始了解',
    note: '認識人參，可以先從植物本身與生長的地方開始。品種、生長環境與加工方式，都能幫助我們更具體地理解一支參。',
    sourceTitle: '資料來源與圖片署名', sources: ['吉林省人參產區介紹', '長白山地區人參栽培歷史', '人參植物分類資料'],
    photos: '圖片', mountainCredit: '天池攝影 颐园新居', plantCredit: '人參攝影 Doge24190',
    photoNote: '圖片已調整為網頁顯示尺寸。', footer: '一份關於長白山與人參的入門介紹。',
    language: '選擇語言', skip: '跳轉至正文', contact: '聯絡我們'
  }
};

const sources = [
  'https://fzzx.jl.gov.cn/yjcg/202208/t20220830_8555543.html',
  'https://www.jl.gov.cn/szfzt/tzcj/tpxwx/202409/t20240906_3293971.html',
  'https://pgrc-rpc.agr.gc.ca/gringlobal/taxon/taxonomydetail?id=26379'
];

const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function render(language) {
  const c = content[language.code];
  const canonical = origin + language.path;
  return `<!doctype html>
<html lang="${language.code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(c.title)}</title>
  <meta name="description" content="${escape(c.description)}">
  <meta name="theme-color" content="#214b41">
  <link rel="icon" href="/images/ginseng-plant.jpg" type="image/jpeg">
  <link rel="canonical" href="${canonical}">
  ${languages.map(l => `<link rel="alternate" hreflang="${l.code}" href="${origin + l.path}">`).join('\n  ')}
  <link rel="alternate" hreflang="x-default" href="${origin}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(c.title)}">
  <meta property="og:description" content="${escape(c.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${origin}/images/changbai-tianchi.jpg">
  <link rel="stylesheet" href="/style.css">
  <script src="/site.js" defer></script>
</head>
<body>
  <a class="skip" href="#main">${c.skip}</a>
  <header>
    <a class="brand" href="${language.path}">${c.brand}</a>
    <details class="language-menu">
      <summary aria-label="${c.language}" title="${c.language}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"></path></svg></summary>
      <nav aria-label="${c.language}">${languages.map(l => `<a href="${l.path}" lang="${l.code}" hreflang="${l.code}"${l.code === language.code ? ' aria-current="page"' : ''}>${l.label}</a>`).join('')}</nav>
    </details>
  </header>
  <main id="main">
    <section class="hero">
      <div class="hero-copy"><h1>${c.heading}</h1><p>${c.intro}</p><a class="button" href="#region">${c.explore}</a></div>
      <figure class="landscape"><img src="/images/changbai-tianchi.jpg" width="1280" height="720" alt="${c.lake}" fetchpriority="high"><figcaption>${c.lake}</figcaption></figure>
    </section>
    <section class="region" id="region"><h2>${c.placeTitle}</h2><div><p>${c.place}</p><p>${c.history}</p></div></section>
    <section class="plant"><figure><img src="/images/ginseng-plant.jpg" width="960" height="1440" loading="lazy" alt="${c.plantCaption}"><figcaption>${c.plantCaption}</figcaption></figure><div class="plant-copy"><h2>${c.plantTitle}</h2><p>${c.plant}</p><div class="origin-note"><h3>${c.noteTitle}</h3><p>${c.note}</p></div></div></section>
  </main>
  <footer><div><p>${c.footer}</p><p class="contact"><span>${c.contact}</span><a href="mailto:service@changbaishanginseng.com">service@changbaishanginseng.com</a></p></div><details><summary>${c.sourceTitle}</summary><ul>${sources.map((url, i) => `<li><a href="${url}">${c.sources[i]}</a></li>`).join('')}</ul><p>${c.photos} <a href="https://commons.wikimedia.org/wiki/File:Tianchi_Lake_of_Changbai_20130714.jpeg">${c.mountainCredit}</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a><br><a href="https://commons.wikimedia.org/wiki/File:Ginseng_flower_in_Changbai_Mountain.jpg">${c.plantCredit}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></p><p>${c.photoNote}</p></details></footer>
</body></html>`;
}

for (const language of languages) {
  const directory = 'public' + language.path;
  await mkdir(directory, { recursive: true });
  await writeFile(directory + 'index.html', render(language));
}

await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${languages.map(l => `  <url><loc>${origin + l.path}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('public/404.html', '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><link rel="stylesheet" href="/style.css"><main class="not-found"><h1>Page not found</h1><p><a href="/">Return to Changbaishan Ginseng</a></p></main></html>');
await writeFile('public/_headers', '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log(`Built ${languages.length} language versions.`);
await import('./build-storefront.mjs');
