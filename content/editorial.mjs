export const assets = [
  { id: 'base', path: '/images/owned-base-ginseng.jpg', source: '图库/林下参基地/白山传奇大顶子野山参基地.jpg', alt: 'Forest-cultivated ginseng with red fruit', role: 'about' },
  { id: 'forest', path: '/images/owned-forest.jpg', source: '图库/林下参基地/林下参照片/森林21.JPG', alt: 'Woodland canopy and forest floor', role: 'cultivation' },
  { id: 'sowing', path: '/images/owned-sowing.jpg', source: '图库/林下参基地/人参照片/人参照片/白山传奇万亩野山参基地播种期.jpg', alt: 'Planting work beneath forest cover', role: 'cultivation' },
  { id: 'root', path: '/images/owned-root-detail.jpg', source: '图库/林下参基地/人参照片/人参/鲜野山参（参王）.jpg', alt: 'A fresh ginseng root and its fine rootlets', role: 'botany' },
  { id: 'fruit', path: '/images/ginseng-berries-closeup-24.webp', source: '图库/林下参基地/林下参照片/林下参24.JPG', alt: 'A close-up of red ginseng berries', role: 'botany' },
  { id: 'museum', path: '/images/owned-museum.jpg', source: '图库/博物馆照片精简格式/DSC_7530 (复制).JPG', alt: 'Displays in a ginseng cultural exhibition', role: 'culture' },
  { id: 'root-in-forest', path: '/images/owned-root-in-forest.jpg', source: '图库/林下参基地/林谷鲜/林谷鲜/IMG_8109.JPG', alt: 'A ginseng root shown in a forest setting', role: 'people' },
  { id: 'harvest', path: '/images/owned-harvest.jpg', source: '图库/林下参采挖.mpg', sourceTimeSeconds: 150, alt: 'Careful excavation of a ginseng root', role: 'harvest' }
];

export const articles = [
  {
    slug: 'what-is-panax-ginseng',
    image: '/images/ginseng-berries-closeup-24.webp',
    published: '2026-11-12',
    sources: [
      { title: 'Asian ginseng botanical name — NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/Immunefunction-HealthProfessional/' },
      { title: 'Panax ginseng names and background — Japan Ministry of Health eJIM', url: 'https://www.ejim.mhlw.go.jp/pro/overseas/c04/03.html' },
      { title: 'Asian ginseng plant definition — US National Cancer Institute', url: 'https://www.cancer.gov/publications/dictionaries/cancer-drug/def/asian-ginseng' }
    ],
    translations: {
      en: {
        title: 'What is Panax ginseng?',
        description: 'Meet the plant behind Asian ginseng and learn how its botanical name, growing place and product form help you read a label.',
        sections: [
          { heading: 'Start with the botanical name', paragraphs: ['Panax ginseng is the botanical name associated with Asian ginseng, also commonly called Chinese or Korean ginseng. It is a perennial herb. American ginseng carries the name Panax quinquefolius. Reading the scientific name gives you a precise starting point when comparing products sold under the broad name ginseng.'] },
          { heading: 'Look above and below the soil', paragraphs: ['Our forest photographs show the plant in leaf and in fruit, alongside the roots that are usually seen in a shop. A root has a main body and branching rootlets. Looking at the whole plant helps connect the dried ingredient with the landscape where it grows. The root is the part most commonly used in ginseng products.'] },
          { heading: 'Read the product in three steps', paragraphs: ['Check the species name, then the stated growing origin, then the form supplied. Whole roots, slices and powder describe different presentations. White ginseng and red ginseng describe processing traditions. A useful product description makes the species, processing method, net quantity and packaging easy to find.'] }
        ]
      },
      ja: {
        title: 'Panax ginsengとはどんな植物？',
        description: '人参の学名、育った場所、商品の形状を手がかりに、高麗人参の植物としての姿を知ります。',
        sections: [
          { heading: 'まず学名を確かめる', paragraphs: ['Panax ginsengは、高麗人参、朝鮮人参、オタネニンジンなどと呼ばれる多年草の学名です。アメリカニンジンにはPanax quinquefoliusという学名があります。「人参」という広い呼び名の商品を比べるとき、学名が具体的な手がかりになります。'] },
          { heading: '地上と土の中の姿を見る', paragraphs: ['私たちの森林写真では、葉や果実をつけた人参と、店頭でよく目にする根を紹介しています。根には主根と細かく枝分かれする根があります。植物全体を見ることで、乾燥した素材と生育地の風景がつながります。人参製品で主に使われるのは根の部分です。'] },
          { heading: '商品の説明を読む順番', paragraphs: ['学名、生育した産地、届く商品の形状を順に確認してみましょう。丸ごとの根、スライス、粉末は形状を表し、白参と紅参は加工方法を表します。種類、加工方法、内容量、包装が分かる説明は、商品選びの助けになります。'] }
        ]
      },
      ko: {
        title: 'Panax ginseng은 어떤 식물일까요?',
        description: '인삼의 학명, 재배 산지와 제품 형태를 통해 식물과 상품을 차근차근 알아봅니다.',
        sections: [
          { heading: '학명부터 확인하기', paragraphs: ['Panax ginseng은 아시아 인삼에 사용하는 학명으로, 중국 인삼이나 고려인삼이라는 이름으로도 알려져 있습니다. 여러 해 자라는 초본 식물입니다. 미국삼의 학명은 Panax quinquefolius입니다. 인삼이라는 넓은 이름으로 판매되는 상품을 비교할 때 학명은 구체적인 출발점이 됩니다.'] },
          { heading: '땅 위와 아래의 모습', paragraphs: ['우리 숲 사진에는 잎과 열매를 맺은 인삼, 그리고 매장에서 자주 보게 되는 뿌리가 담겨 있습니다. 뿌리는 중심 몸통과 여러 갈래의 잔뿌리로 이루어집니다. 식물 전체를 살펴보면 말린 재료가 자라던 풍경도 함께 이해할 수 있습니다. 인삼 제품에는 주로 뿌리를 사용합니다.'] },
          { heading: '상품 설명을 읽는 세 단계', paragraphs: ['학명을 확인한 다음 재배 산지와 제공되는 형태를 살펴보세요. 통뿌리, 절편과 분말은 제품의 형태를 설명합니다. 백삼과 홍삼은 가공 방식을 설명합니다. 종류, 가공 방법, 내용량과 포장이 분명한 설명은 상품을 고르는 데 도움이 됩니다.'] }
        ]
      },
      'zh-Hans': {
        title: '人参的学名Panax ginseng是什么意思？',
        description: '从学名、植物形态、产地与加工方式入手，认识人参，并学会阅读商品说明。',
        sections: [
          { heading: '先从学名认识人参', paragraphs: ['Panax ginseng是亚洲人参的学名，英文商品中也常见Chinese ginseng或Korean ginseng等名称。它是一种多年生草本植物。西洋参的学名为Panax quinquefolius。比较以“人参”为名称的商品时，学名能提供更具体的识别线索。'] },
          { heading: '看看土壤上下的模样', paragraphs: ['我们的森林照片展示了人参的叶、果实，以及商品中常见的根。参根有主根和分枝的须根。把植物全貌与根部放在一起观察，能将干燥的食材与它生长的环境联系起来。人参产品最常使用的是根部。'] },
          { heading: '分三步阅读商品说明', paragraphs: ['先看植物学名称，再看标示的生长产地，最后确认实际提供的形态。整支、切片和粉末描述了产品的形状，白参和红参描述了加工方式。清楚列出品种、加工方法、净含量与包装的商品说明，更便于你按需求选择。'] }
        ]
      },
      'zh-Hant': {
        title: '人參的學名Panax ginseng是什麼意思？',
        description: '從學名、植物形態、產地與加工方式入手，認識人參，並學會閱讀商品說明。',
        sections: [
          { heading: '先從學名認識人參', paragraphs: ['Panax ginseng是亞洲人參的學名，英文商品中也常見Chinese ginseng或Korean ginseng等名稱。它是一種多年生草本植物。西洋參的學名為Panax quinquefolius。比較以「人參」為名稱的商品時，學名能提供更具體的識別線索。'] },
          { heading: '看看土壤上下的模樣', paragraphs: ['我們的森林照片展示了人參的葉、果實，以及商品中常見的根。參根有主根和分枝的鬚根。把植物全貌與根部放在一起觀察，能將乾燥的食材與它生長的環境聯繫起來。人參產品最常使用的是根部。'] },
          { heading: '分三步閱讀商品說明', paragraphs: ['先看植物學名稱，再看標示的生長產地，最後確認實際提供的形態。整支、切片和粉末描述了產品的形狀，白參和紅參描述了加工方式。清楚列出品種、加工方法、淨含量與包裝的商品說明，更便於你按需求選擇。'] }
        ]
      }
    }
  },
  {
    slug: 'forest-cultivated-ginseng',
    image: '/images/owned-harvest.jpg',
    published: '2026-11-12',
    sources: [
      { title: 'Jilin ginseng planting and production records', url: 'https://agri.jl.gov.cn/gk/zcfg/fg/202601/t20260102_3542914.html' },
      { title: 'Forest ginseng ecological cultivation guidance', url: 'https://www.ttbz.org.cn/Home/PdfFileStreamGet/c3QsNDY3NzQ%28eq%29' },
      { title: 'Forest ginseng ecological tending terminology', url: 'https://rsyjy.ccucm.edu.cn/__local/5/1F/67/19338880FBB17B08E9BE5072861_44403CE4_73A45.pdf?e=.pdf' }
    ],
    translations: {
      en: {
        title: 'What does forest-cultivated ginseng mean?',
        description: 'A practical introduction to ginseng grown under woodland cover, from sowing and forest management to the questions worth asking about a root.',
        sections: [
          { heading: 'Cultivation beneath the trees', paragraphs: ['Forest cultivation places ginseng into a woodland growing environment. Local technical guidance describes sowing seeds or establishing plants under forest cover, with attention to vegetation and the soil. The phrase tells you about a growing method. Ask the grower how the plants were established and how the woodland was managed.'] },
          { heading: 'Follow the growing record', paragraphs: ['Jilin’s ginseng production framework covers records for the planting location, planting and harvest dates, agricultural inputs, quality checks and sales. These details provide practical questions for a supplier. A named location and a documented harvest help explain a particular batch.'] },
          { heading: 'Keep age, origin and quantity separate', paragraphs: ['When considering a forest-cultivated root, ask about its stated age, the evidence supporting that age, the growing place and the net weight you will receive. These details answer different questions. For a gift box, also check whether the photograph shows the exact root or a representative product. Our archive photographs let you see woodland, planting work and the care involved in excavation.'] }
        ]
      },
      ja: {
        title: '森林で育つ人参「林下参」とは？',
        description: '木々の下で育てる人参について、種まき、生育記録、購入前に確認したい点を紹介します。',
        sections: [
          { heading: '木々の下で育てる', paragraphs: ['林下参の栽培では、森林の環境の中で人参を育てます。地域の技術資料には、植生と土壌に配慮しながら、林内に種をまいたり苗を植えたりする方法が示されています。この呼び名は生育方法を伝えます。種や苗の由来、森林の管理方法を生産者に尋ねると、理解が深まります。'] },
          { heading: '栽培の記録をたどる', paragraphs: ['吉林省の人参生産に関する制度では、栽培地、種まきと収穫の日付、農業資材、品質確認、販売などの記録が扱われています。これらは仕入先に確認する際の具体的な項目です。生育地と収穫の記録は、ひとつのロットの背景を伝えます。'] },
          { heading: '年数、産地、内容量を確認する', paragraphs: ['林下参を選ぶ際は、表示された生育年数とその根拠、育った場所、届く商品の正味重量をそれぞれ確認しましょう。贈答用の商品では、写真が届く現物か、代表的な商品例かも確認すると役立ちます。私たちの写真では、森林、植え付け作業、丁寧に根を掘り出す様子をご覧いただけます。'] }
        ]
      },
      ko: {
        title: '산림에서 재배하는 인삼은 어떻게 자랄까요?',
        description: '나무 아래에서 기르는 인삼의 파종과 재배 기록, 구매 전 확인할 내용을 알아봅니다.',
        sections: [
          { heading: '나무 아래에서 기르는 인삼', paragraphs: ['산림 재배는 숲의 환경에서 인삼을 기르는 방식입니다. 지역 기술 지침에는 식생과 토양을 살피면서 숲 아래에 씨앗을 뿌리거나 식물을 심는 방법이 설명되어 있습니다. 이 표현은 재배 방식을 알려줍니다. 어떻게 심었고 숲을 어떻게 관리했는지 재배자에게 물어보면 도움이 됩니다.'] },
          { heading: '재배 기록 살펴보기', paragraphs: ['지린성의 인삼 생산 제도는 재배 위치, 파종일과 수확일, 농업 투입재, 품질 검사와 판매 기록을 다룹니다. 이러한 정보는 공급자에게 물어볼 수 있는 구체적인 항목입니다. 명확한 산지와 수확 기록은 개별 생산 로트의 배경을 설명합니다.'] },
          { heading: '재배 기간, 산지와 중량 확인하기', paragraphs: ['산림 재배 인삼을 고를 때 표시된 재배 기간과 이를 뒷받침하는 자료, 재배 장소, 실제 제공되는 순중량을 각각 확인하세요. 선물 상자라면 사진이 배송될 실제 뿌리인지 대표 이미지인지 확인하는 것도 도움이 됩니다. 우리 사진 자료에서는 숲, 파종 작업과 뿌리를 조심스럽게 캐는 과정을 볼 수 있습니다.'] }
        ]
      },
      'zh-Hans': {
        title: '林下参是怎样种植和生长的？',
        description: '从林下播种、生境管理与生产记录，了解林下参，并梳理购买时值得询问的细节。',
        sections: [
          { heading: '在树木覆盖下生长', paragraphs: ['林下栽培把人参放在森林环境中生长。地方技术资料介绍了在林下播种、栽植，以及关注植被和土壤环境的做法。“林下栽培”传达的是生长方式。向种植者了解种子或种苗如何进入林地、林地如何管理，有助于理解一支参的来历。'] },
          { heading: '顺着生产记录了解产地', paragraphs: ['吉林省人参生产管理制度涉及种植地块、播种与收获日期、农业投入品、质量检查和销售记录。这些都是向供应商了解产品时可以提出的具体问题。明确的生长地点和采收记录，有助于解释某个批次的来源。'] },
          { heading: '分别确认参龄、产地与重量', paragraphs: ['挑选林下参时，可以分别询问标示的参龄及其依据、生长地点和实际交付的净重。选择礼盒时，还可以确认图片展示的是将要收到的实物，还是具有代表性的商品。我们的图库记录了森林、播种作业，以及小心采挖参根的过程。'] }
        ]
      },
      'zh-Hant': {
        title: '林下參是怎樣種植和生長的？',
        description: '從林下播種、生境管理與生產記錄，了解林下參，並梳理購買時值得詢問的細節。',
        sections: [
          { heading: '在樹木覆蓋下生長', paragraphs: ['林下栽培把人參放在森林環境中生長。地方技術資料介紹了在林下播種、栽植，以及關注植被和土壤環境的做法。「林下栽培」傳達的是生長方式。向種植者了解種子或種苗如何進入林地、林地如何管理，有助於理解一支參的來歷。'] },
          { heading: '順著生產記錄了解產地', paragraphs: ['吉林省人參生產管理制度涉及種植地塊、播種與收穫日期、農業投入品、品質檢查和銷售記錄。這些都是向供應商了解產品時可以提出的具體問題。明確的生長地點和採收記錄，有助於解釋某個批次的來源。'] },
          { heading: '分別確認參齡、產地與重量', paragraphs: ['挑選林下參時，可以分別詢問標示的參齡及其依據、生長地點和實際交付的淨重。選擇禮盒時，還可以確認圖片展示的是將要收到的實物，還是具有代表性的商品。我們的圖庫記錄了森林、播種作業，以及小心採挖參根的過程。'] }
        ]
      }
    }
  },
  {
    slug: 'white-and-red-ginseng',
    image: '/images/owned-root-detail.jpg',
    published: '2026-11-12',
    sources: [
      { title: 'Standard for Ginseng Products CXS 321-2015 — FAO/WHO Codex Alimentarius', url: 'https://www.fao.org/fao-who-codexalimentarius/sh-proxy/en/?lnk=1&url=https%253A%252F%252Fworkspace.fao.org%252Fsites%252Fcodex%252FStandards%252FCXS%2B321-2015%252FCXS_321e.pdf' },
      { title: 'Ginseng Industry Act product definitions — FAOLEX', url: 'https://faolex.fao.org/docs/pdf/kor70668.pdf' },
      { title: 'White and red ginseng processing background — Japan Ministry of Health eJIM', url: 'https://www.ejim.mhlw.go.jp/pro/overseas/c04/03.html' }
    ],
    translations: {
      en: {
        title: 'How white and red ginseng are processed',
        description: 'Learn what drying, steaming and cutting tell you about whole-root ginseng, slices and powder.',
        sections: [
          { heading: 'White ginseng begins with drying', paragraphs: ['White ginseng is made by drying the fresh root. Sun drying, hot-air drying and other recognized methods appear in food standards and product definitions. A product sold as sun-dried ginseng describes the drying method. Check the product specification for the actual process used.'] },
          { heading: 'Red ginseng includes steaming', paragraphs: ['Red ginseng is prepared by steaming the root and then drying it. Processing changes the appearance of the root. White and red ginseng can both originate from Panax ginseng, so a complete product description includes the botanical species as well as the processing method.'] },
          { heading: 'Whole roots, slices and powder', paragraphs: ['Food standards describe dried ginseng supplied as main roots, lateral roots, slices or powder. A whole root offers a visible presentation, while slices offer a pre-cut format. Powder has a finely divided form. When choosing, look for net weight, ingredients, storage directions and the packaging you will receive. For a gift, also compare the root quantity and the box contents.'] },
          { heading: 'Use the product’s own instructions', paragraphs: ['Preparation and storage information should accompany the particular product. Follow its label when planning how to use or store it, and contact us if a listed specification needs clarification. Our product pages show each available size and net-weight option separately.'] }
        ]
      },
      ja: {
        title: '白参と紅参はどのように加工される？',
        description: '乾燥、蒸し、カットという加工から、丸ごとの根、スライス、粉末の人参を知ります。',
        sections: [
          { heading: '白参は根を乾燥させる', paragraphs: ['白参は、生の人参の根を乾燥させて作ります。食品規格や製品の定義では、天日乾燥、温風乾燥などの方法が示されています。「天日干し人参」という表記は乾燥方法を表します。具体的な工程は、それぞれの商品仕様で確認しましょう。'] },
          { heading: '紅参には蒸す工程がある', paragraphs: ['紅参は根を蒸してから乾燥させます。この工程によって根の外観が変わります。白参と紅参はいずれもPanax ginsengから作られることがあるため、学名と加工方法を合わせて読むと商品の内容が分かりやすくなります。'] },
          { heading: '丸ごとの根、スライス、粉末', paragraphs: ['食品規格では、乾燥人参の主根、側根、スライス、粉末などの形状が扱われています。丸ごとの根は姿を見て楽しめ、スライスはあらかじめカットされた形状です。粉末は細かく粉砕された形状です。正味重量、原材料、保存方法、届く包装を確認しましょう。贈答品では根の本数や箱の内容も参考になります。'] },
          { heading: '商品ごとの案内を読む', paragraphs: ['準備や保存については、手元の商品に付属する表示を確認してください。仕様について気になる点がある場合はお問い合わせいただけます。当店の商品ページでは、サイズと内容量の選択肢をそれぞれ表示しています。'] }
        ]
      },
      ko: {
        title: '백삼과 홍삼은 어떻게 가공할까요?',
        description: '건조, 증숙과 절단 과정을 통해 통뿌리, 절편과 분말 인삼을 알아봅니다.',
        sections: [
          { heading: '백삼의 건조 과정', paragraphs: ['백삼은 수삼의 뿌리를 말려 만듭니다. 식품 규격과 제품 정의에는 햇볕 건조, 열풍 건조 등의 방법이 나와 있습니다. 햇볕에 말린 인삼이라는 표시는 건조 방식을 알려줍니다. 실제 가공 과정은 개별 상품의 명세에서 확인하세요.'] },
          { heading: '홍삼의 증숙 과정', paragraphs: ['홍삼은 뿌리를 찐 다음 건조하여 만듭니다. 가공 과정에서 뿌리의 외관이 달라집니다. 백삼과 홍삼은 모두 Panax ginseng을 원료로 만들 수 있으므로, 학명과 가공 방식을 함께 확인하면 상품을 이해하기 쉽습니다.'] },
          { heading: '통뿌리, 절편과 분말', paragraphs: ['식품 규격에는 건조 인삼의 몸통과 잔뿌리, 절편과 분말 등의 형태가 설명되어 있습니다. 통뿌리는 전체 모습을 볼 수 있고 절편은 미리 자른 형태입니다. 분말은 곱게 분쇄한 형태입니다. 선택할 때 순중량, 원재료, 보관 안내와 배송될 포장을 확인하세요. 선물용이라면 뿌리 수량과 상자 구성도 살펴볼 수 있습니다.'] },
          { heading: '제품별 안내 확인하기', paragraphs: ['준비와 보관은 해당 상품의 표시 사항을 따라주세요. 명세에 궁금한 점이 있다면 문의하실 수 있습니다. 우리 상품 페이지에서는 크기와 순중량 선택지를 각각 표시합니다.'] }
        ]
      },
      'zh-Hans': {
        title: '白参和红参是怎样加工出来的？',
        description: '认识干燥、蒸制与切制，了解整支人参、参片和参粉的产品形态。',
        sections: [
          { heading: '白参从干燥开始', paragraphs: ['白参由鲜人参根经过干燥加工制成。食品标准和产品定义中列有日晒、热风干燥等方法。“生晒参”这个名称说明了干燥加工方式。具体采用怎样的工艺，可以继续查看对应商品的规格说明。'] },
          { heading: '红参经过蒸制', paragraphs: ['红参先经过蒸制，再进行干燥，根的外观也随加工发生变化。白参和红参都可以由Panax ginseng加工而来，因此，把植物学名称与加工方式一起看，更容易了解一款产品。'] },
          { heading: '整支、切片与粉末', paragraphs: ['食品标准中涉及主根、侧根、切片和粉末等干燥人参形态。整支参便于观察完整形态，参片已经完成切制，参粉则呈细碎粉末状。选择时可以查看净含量、配料、储存说明和实际交付的包装。作为礼品时，也可以比较参根数量与礼盒内容。'] },
          { heading: '查看具体商品的使用说明', paragraphs: ['准备和保存方式应以手中商品的标签为依据。如对某项规格有疑问，可以联系我们了解详情。我们在商品页中分别展示可选的尺寸与净重规格。'] }
        ]
      },
      'zh-Hant': {
        title: '白參和紅參是怎樣加工出來的？',
        description: '認識乾燥、蒸製與切製，了解整支人參、參片和參粉的產品形態。',
        sections: [
          { heading: '白參從乾燥開始', paragraphs: ['白參由鮮人參根經過乾燥加工製成。食品標準和產品定義中列有日曬、熱風乾燥等方法。「生曬參」這個名稱說明了乾燥加工方式。具體採用怎樣的工藝，可以繼續查看對應商品的規格說明。'] },
          { heading: '紅參經過蒸製', paragraphs: ['紅參先經過蒸製，再進行乾燥，根的外觀也隨加工發生變化。白參和紅參都可以由Panax ginseng加工而來，因此，把植物學名稱與加工方式一起看，更容易了解一款產品。'] },
          { heading: '整支、切片與粉末', paragraphs: ['食品標準中涉及主根、側根、切片和粉末等乾燥人參形態。整支參便於觀察完整形態，參片已經完成切製，參粉則呈細碎粉末狀。選擇時可以查看淨含量、配料、儲存說明和實際交付的包裝。作為禮品時，也可以比較參根數量與禮盒內容。'] },
          { heading: '查看具體商品的使用說明', paragraphs: ['準備和保存方式應以手中商品的標籤為依據。如對某項規格有疑問，可以聯絡我們了解詳情。我們在商品頁中分別展示可選的尺寸與淨重規格。'] }
        ]
      }
    }
  }
];

export const about = {
  image: '/images/owned-base-ginseng.jpg',
  gallery: ['/images/owned-sowing.jpg', '/images/owned-harvest.jpg', '/images/owned-root-in-forest.jpg', '/images/owned-museum.jpg'],
  merchantName: '吉林白山传奇生态农业科技有限公司',
  email: 'service@changbaishanginseng.com',
  phone: '+86 15500376880',
  address: '吉林省通化市集安市麻线药业工业区白山传奇工厂',
  translations: {
    en: {
      title: 'Our roots in Changbaishan',
      description: 'A family ginseng business rooted in Jilin, with decades of experience and a forest-cultivation base in the Changbai Mountain region.',
      sections: [
        { heading: 'A family connection to ginseng', paragraphs: ['Changbaishan Ginseng draws on our family’s decades of work in the ginseng trade. Our experience begins with the growing place and continues through harvesting, processing and supply. We are based in Ji’an, Jilin, in the Changbai Mountain region of Northeast China.'] },
        { heading: 'From the forest', paragraphs: ['Our family’s forest ginseng base covers 60,000 mu, approximately 4,000 hectares. The photographs on this website come from our project archive and show the woodland, ginseng plants, cultivation work and harvesting that inform our everyday understanding of the root.'] },
        { heading: 'For your table and your business', paragraphs: ['We offer ginseng for individual customers and welcome inquiries about larger orders. Tell us the product form, quantity and destination you have in mind. We can discuss specifications, packaging and delivery arrangements with you.'] },
        { heading: 'Share a question', paragraphs: ['Use the form below to leave your email and a message. You can ask about a product, a growing method or a wholesale order. Our team aims to make its first reply within two business days.'] }
      ]
    },
    ja: {
      title: '長白山に根づく私たちの歩み',
      description: '吉林省で長年人参に携わってきた家族の経験と、長白山地域の林下栽培基地を紹介します。',
      sections: [
        { heading: '家族と人参のつながり', paragraphs: ['Changbaishan Ginsengは、何十年にもわたり人参の商いに携わってきた家族の経験を土台にしています。生育地から収穫、加工、供給まで、人参と向き合ってきました。拠点は中国東北部の長白山地域に位置する吉林省集安市です。'] },
        { heading: '森林から届く物語', paragraphs: ['私たちの家族が持つ林下人参基地の面積は6万ムー、約4,000ヘクタールです。このサイトの実景写真はプロジェクトの写真資料から選び、森林、人参の植物、栽培作業や収穫の様子を紹介しています。'] },
        { heading: 'ご家庭にも、お仕事にも', paragraphs: ['個人のお客様向けに人参を販売し、大口注文のお問い合わせも承ります。ご希望の形状、数量、お届け先をお知らせください。仕様、包装、配送方法についてご相談いただけます。'] },
        { heading: 'お気軽にお問い合わせください', paragraphs: ['下のフォームにメールアドレスとメッセージをご記入ください。商品、栽培方法、卸売のご相談をお待ちしています。担当チームは2営業日以内の初回返信を目指しています。'] }
      ]
    },
    ko: {
      title: '창바이산에 뿌리를 둔 이야기',
      description: '오랜 세월 인삼을 다뤄 온 가족의 경험과 지린성 창바이산 지역의 산림 재배 기반을 소개합니다.',
      sections: [
        { heading: '가족과 인삼의 오랜 인연', paragraphs: ['Changbaishan Ginseng은 수십 년 동안 인삼을 거래해 온 우리 가족의 경험을 바탕으로 합니다. 재배 산지에서 수확, 가공과 공급까지 인삼을 다뤄 왔습니다. 우리의 거점은 중국 동북부 창바이산 지역에 있는 지린성 지안시입니다.'] },
        { heading: '숲에서 시작되는 이야기', paragraphs: ['우리 가족의 산림 인삼 재배 기반은 6만 무, 약 4,000헥타르 규모입니다. 웹사이트의 현장 사진은 프로젝트 사진 자료에서 골랐으며, 숲과 인삼 식물, 재배 작업과 수확 과정을 담고 있습니다.'] },
        { heading: '개인 구매와 사업 문의', paragraphs: ['개인 고객을 위한 인삼을 판매하며 대량 주문 문의도 환영합니다. 원하는 제품 형태, 수량과 배송지를 알려주세요. 명세, 포장과 배송 방법을 함께 논의할 수 있습니다.'] },
        { heading: '궁금한 점을 남겨주세요', paragraphs: ['아래 양식에 이메일과 메시지를 남겨주세요. 상품, 재배 방식이나 도매 주문에 관해 문의할 수 있습니다. 담당 팀은 영업일 기준 2일 이내에 첫 답변을 드리는 것을 목표로 합니다.'] }
      ]
    },
    'zh-Hans': {
      title: '扎根长白山的人参事业',
      description: '了解我们家族几十年的人参经营积累，以及位于吉林长白山地区的林下参基地。',
      sections: [
        { heading: '家族与人参的长期联系', paragraphs: ['Changbaishan Ginseng依托家族几十年的人参经营经验。从生长产地，到采挖、加工与供应，我们持续与人参打交道。我们的所在地是中国东北长白山地区的吉林省集安市。'] },
        { heading: '从森林开始了解', paragraphs: ['我们家族的林下参基地面积为6万亩，约合4,000公顷。网站中的实景照片选自项目图库，记录了森林环境、人参植株、种植作业与采挖过程，帮助你了解一支参背后的生长场景。'] },
        { heading: '面向个人与批量采购', paragraphs: ['我们为个人消费者提供人参产品，也欢迎批量采购咨询。你可以告诉我们需要的产品形态、数量与收货地区，一起讨论规格、包装和配送安排。'] },
        { heading: '留下你的问题', paragraphs: ['在下方填写邮箱与留言，可以咨询产品、种植方式或批发订单。我们的团队以2个工作日内首次回复为目标。'] }
      ]
    },
    'zh-Hant': {
      title: '紮根長白山的人參事業',
      description: '了解我們家族幾十年的人參經營積累，以及位於吉林長白山地區的林下參基地。',
      sections: [
        { heading: '家族與人參的長期聯繫', paragraphs: ['Changbaishan Ginseng依托家族幾十年的人參經營經驗。從生長產地，到採挖、加工與供應，我們持續與人參打交道。我們的所在地是中國東北長白山地區的吉林省集安市。'] },
        { heading: '從森林開始了解', paragraphs: ['我們家族的林下參基地面積為6萬畝，約合4,000公頃。網站中的實景照片選自專案圖庫，記錄了森林環境、人參植株、種植作業與採挖過程，幫助你了解一支參背後的生長場景。'] },
        { heading: '面向個人與批量採購', paragraphs: ['我們為個人消費者提供人參產品，也歡迎批量採購諮詢。你可以告訴我們需要的產品形態、數量與收貨地區，一起討論規格、包裝和配送安排。'] },
        { heading: '留下你的問題', paragraphs: ['在下方填寫郵箱與留言，可以諮詢產品、種植方式或批發訂單。我們的團隊以2個工作日內首次回覆為目標。'] }
      ]
    }
  }
};

export default { articles, about, assets };
