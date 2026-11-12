const company = '吉林白山传奇生态农业科技有限公司';
const email = 'service@changbaishanginseng.com';
const phone = '+86 15500376880';
const address = '吉林省通化市集安市麻线药业工业区白山传奇工厂';
const addressEn = 'Baishan Chuanqi Factory, Maxian Pharmaceutical Industrial Zone, Ji’an, Tonghua, Jilin, China';

// Regional review sources checked on 2026-11-12.
// Shopify consumer protection guidance lists the return address among refund policy details.
// https://help.shopify.com/en/manual/compliance/legal/consumer-protection
// Korea, Articles 17–18, including the three-business-day statutory refund period.
// https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1031806071
// Japan, disclosure of mail-order return conditions and seller information.
// https://www.no-trouble.caa.go.jp/what/mailorder/
// US shipment delays and the customer's cancellation/refund choice.
// https://www.ftc.gov/business-guidance/resources/selling-internet-prompt-delivery-rules
// Shopify enhanced services and privacy choices.
// https://help.shopify.com/en/manual/privacy-and-security/privacy/shopify-network-intelligence-requirements

const en = {
  returns: {
    title: 'Returns and refunds',
    description: 'Our seven-day return policy, return shipping arrangements and refund process.',
    sections: [
      {
        heading: 'Seven-day returns',
        paragraphs: [
          'You may request a change-of-mind return within seven calendar days after receiving your order, provided the goods remain in a condition suitable for resale.',
          `Email [${email}](mailto:${email}) with your order number and the items you wish to return. Your request date is the date you send the request. We will confirm the return arrangements and provide packing and shipping instructions.`
        ]
      },
      {
        heading: 'Return shipping and the original delivery charge',
        paragraphs: [
          'For a change-of-mind return, you pay the return shipping cost. Any original delivery charge that was separately collected and already incurred is retained, subject to mandatory consumer law.',
          'Returns are sent to China. Please consider the international return cost before ordering and use the return instructions supplied for your order.'
        ]
      },
      {
        heading: 'Quality problems, damage or an incorrect item',
        paragraphs: [
          'If your goods have a quality problem, arrive damaged or differ from the item ordered, contact us with your order number and a description of the issue. Photographs, where available, help us review it.',
          'You may choose a refund or a replacement. We cover the necessary return shipping and replacement shipping costs for these issues. The seven-day change-of-mind window does not limit your mandatory rights concerning faulty or misdescribed goods.'
        ]
      },
      {
        heading: 'Return address',
        paragraphs: [
          `Returns Team, ${company}. ${addressEn}.`,
          `Chinese address for the parcel label — ${address}，退货组。 Telephone ${phone}.`,
          'Please contact us before dispatch so that we can associate the parcel with your order and confirm the shipping instructions.'
        ]
      },
      {
        heading: 'Refund processing',
        paragraphs: [
          'After we receive the returned goods and confirm that the return conditions are met, we initiate the refund within five business days. A shorter mandatory legal deadline takes precedence. Where South Korea’s statutory withdrawal rules apply, the refund is handled within three business days after receiving the returned goods.',
          'Refunds are normally returned through the original payment method. Your bank or payment provider determines the additional time before the credit appears in your account.'
        ]
      },
      {
        heading: 'Your consumer rights and support',
        paragraphs: [
          'These terms supplement the mandatory consumer rights that apply to your purchase. Applicable statutory return rights, remedies and deadlines continue to apply, including in the United States, Japan and South Korea.',
          `For a return or refund enquiry, contact [${email}](mailto:${email}) or ${phone}. We aim to make our first reply within two business days.`
        ]
      }
    ]
  },
  shipping: {
    title: 'Shipping and delivery',
    description: 'Origin-direct dispatch from Jilin, estimated delivery times and shipping charges.',
    sections: [
      {
        heading: 'Dispatch from the origin',
        paragraphs: [
          'Our goods are dispatched directly from the ginseng-producing region in Jilin, China. Standard in-stock orders are planned for dispatch within three to five business days after payment confirmation.',
          'Business days for preparation are Monday to Friday, excluding public holidays at the dispatch location. Any special preparation time is confirmed with you before we accept the order.',
          'Online checkout is currently being prepared. Payment methods and available delivery routes will be confirmed before sales open.'
        ]
      },
      {
        heading: 'Estimated transit time',
        paragraphs: [
          'For standard delivery to the United States, our planned transit range is 15 to 25 business days after dispatch. Preparation time is additional. The final estimate depends on the carrier and route selected for your order.',
          'Japan and South Korea are intended delivery markets. Country-specific routes, product eligibility and delivery estimates are confirmed before we accept an order for those destinations.',
          'Carrier schedules, customs processing, public holidays and remote-area delivery can affect transit time. If we become aware of a delay, we will share the information available and help investigate.'
        ]
      },
      {
        heading: 'Shipping charges',
        paragraphs: [
          'Orders with a merchandise value of USD 100 or more qualify for standard free shipping to an available destination. Orders below USD 100 have a USD 10 standard shipping charge per order.',
          'Equivalent amounts may be displayed in other currencies. The confirmed order and checkout show the shipping charge and payment currency before payment.'
        ]
      },
      {
        heading: 'Import duties and taxes',
        paragraphs: [
          'We are preparing routes that include, or allow prepayment of, import duties and taxes. The tax and customs arrangement for the actual route is confirmed before an order is accepted.',
          'Any import charges collected by us, and any charges the recipient would need to pay on arrival, are disclosed before payment. Please contact us if the destination’s import requirements need clarification.'
        ]
      },
      {
        heading: 'Tracking, delays and lost parcels',
        paragraphs: [
          'After dispatch, the shipping confirmation provides the available tracking information. You can also review the order and shipping status through your customer account.',
          'If we cannot dispatch within the confirmed period, we will contact you with revised information and offer a choice between agreeing to the delay and cancelling for a full refund for the unshipped goods.',
          'If the carrier confirms that a parcel is lost, you may choose a full refund or a replacement. We handle the claim with the carrier.'
        ]
      },
      {
        heading: 'Contact',
        paragraphs: [
          `For delivery questions, contact [${email}](mailto:${email}) or ${phone}. We aim to make our first reply within two business days.`,
          `${company}. ${addressEn}.`
        ]
      }
    ]
  },
  privacy: {
    title: 'Privacy policy',
    description: 'How we handle account details, orders, messages and privacy choices.',
    sections: [
      {
        heading: 'Who handles your information',
        paragraphs: [
          `Changbaishan Ginseng is operated by ${company}, at ${addressEn}. Our team in mainland China handles store operations, customer service and privacy requests.`,
          `You can contact us about personal information at [${email}](mailto:${email}) or ${phone}. This policy was updated on 12 November 2026.`
        ]
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'Account and order information can include your name, email address, delivery and billing addresses, contact telephone number, ordered items, payment status, returns and communications. Checkout providers handle payment details under their own applicable notices.',
          'Our contact form stores the email address, name if provided, and message you submit. Newsletter registration records your email address and marketing choice. Technical information can include IP address, browser information, page requests and cookie preferences for operation and security.',
          'Our forms are designed for shopping and general enquiries. Please limit your message to the information needed for that purpose and keep sensitive health records private.'
        ]
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use the information needed to manage accounts, prepare and deliver orders, provide order and shipping updates, handle enquiries and returns, maintain security, and meet legal and recordkeeping obligations.',
          'We keep a copy of customer email addresses and account identifiers in our own Cloudflare database to support customer records and service continuity. Marketing consent is recorded separately from account registration or purchase.'
        ]
      },
      {
        heading: 'Service providers and international processing',
        paragraphs: [
          'Shopify provides our commerce and customer-account services. Cloudflare provides website hosting, security and database services. When orders are accepted, relevant order details are provided to the payment and delivery providers involved in fulfilling them.',
          'Our mainland China team and service providers may process information in countries outside your country of residence. We use the notices, contractual measures and consent procedures required for the relevant transfer.',
          'Customer lists are reserved for our own customer relationships and the service arrangements described here. We do not sell or rent those lists to other merchants for their independent marketing.'
        ]
      },
      {
        heading: 'Shopify enhanced services',
        paragraphs: [
          'Where Shopify Network Intelligence is enabled for our store, Shopify processes information about interactions with our store together with interactions with other merchants and Shopify to provide enhanced services, including personalization and advertising-related features. Read the [Shopify Consumer Privacy Policy](https://www.shopify.com/legal/privacy/consumers).',
          'Some uses can be treated as data sharing or targeted advertising under applicable US state privacy laws. Manage Shopify account and platform-level choices through [Shopify’s privacy portal](https://privacy.shopify.com/).'
        ]
      },
      {
        heading: 'Cookies and optional analytics',
        paragraphs: [
          'Essential cookies and similar storage support the cart, login, security and saved preferences. Optional analytics and advertising technologies are governed by the choices shown on the site and the requirements that apply in your location.',
          'Google Analytics is part of our planned analytics setup. When configured and activated under the applicable controls, it helps measure visits and shopping activity. The privacy controls identify the optional services available at that time.'
        ]
      },
      {
        heading: 'Email subscriptions',
        paragraphs: [
          'Marketing emails require your subscription choice. You can unsubscribe through the link in an email or by contacting us. Order, account and service messages are handled separately from marketing subscriptions.',
          'Telephone numbers supplied for delivery or service are used for those purposes. Our current marketing programme uses email.'
        ]
      },
      {
        heading: 'Retention and your rights',
        paragraphs: [
          'We retain information for the period needed for the purpose for which it was collected, including order fulfilment, service, disputes and applicable accounting or legal obligations. We then arrange deletion or anonymisation, subject to any required retention.',
          'Depending on your location, you may have rights to access, correct, delete or obtain a copy of your information, withdraw consent, object to certain processing, or opt out of data sharing or targeted advertising. Applicable identity checks and legal exceptions may apply.',
          `Send requests to [${email}](mailto:${email}). We aim to acknowledge enquiries within two business days and handle the request within the applicable legal period.`
        ]
      },
      {
        heading: 'Privacy choices',
        paragraphs: [
          'Use [privacy choices](#privacy-choices) to manage optional tracking on this website. Supported Global Privacy Control signals set the relevant website advertising and data-sharing preferences to opt out. When checkout is available, saved choices are passed to Shopify for that checkout.',
          `You can also send a privacy choice or complaint to [${email}](mailto:${email}). Shopify-specific choices are available through [Shopify’s privacy portal](https://privacy.shopify.com/).`,
          'Material changes to our data practices will be reflected in this notice and communicated when applicable law requires it.'
        ]
      }
    ]
  },
  terms: {
    title: 'Terms of service',
    description: 'The conditions for using our website and placing a retail order.',
    sections: [
      {
        heading: 'The seller and these terms',
        paragraphs: [
          `This website is operated by ${company} under the Changbaishan Ginseng name. Our address is ${addressEn}. Contact [${email}](mailto:${email}) or ${phone}.`,
          'These terms apply to website use and retail purchases. The product information, confirmed order, shipping policy and return policy form part of the purchase arrangements. The website is currently preparing online checkout.'
        ]
      },
      {
        heading: 'Products, prices and currency',
        paragraphs: [
          'Check the selected product, option, net quantity and total price before ordering. Ginseng roots naturally vary in appearance. The selected product description identifies what your order includes.',
          'Our base prices are in US dollars. Other displayed currencies are approximate, rounded conversions for browsing. The payment currency and final amount are shown before payment. A payment provider or card issuer may apply its own conversion or fees.'
        ]
      },
      {
        heading: 'Orders, availability and cancellation',
        paragraphs: [
          'You may shop as a guest or choose to use a customer account. Provide accurate contact and delivery information so that we can confirm and fulfil your order.',
          'Ordinary orders can be cancelled for a full refund before they are handed to the carrier and before any separately agreed custom processing begins. Contact us promptly with the order number.',
          'If an item becomes unavailable after payment, we will contact you so that you can choose to wait or receive a refund. Any revised dispatch time requires the relevant customer agreement.'
        ]
      },
      {
        heading: 'Accounts, orders and shipping updates',
        paragraphs: [
          'Shopify provides customer login, order records and available shipping updates. Keep the email account used for login secure and contact us if an order appears incorrect.',
          'Our website also keeps customer email and account records for service administration as described in the [privacy policy](/policies/privacy/). A marketing subscription is a separate choice.'
        ]
      },
      {
        heading: 'Delivery, returns and wholesale enquiries',
        paragraphs: [
          'Delivery arrangements, shipping charges and import-charge treatment are confirmed before payment. See the [shipping policy](/policies/shipping/) and [return policy](/policies/returns/) for the applicable retail terms.',
          'Wholesale, bulk and custom orders start with an enquiry. Product specifications, quotation, delivery and after-sales arrangements are agreed separately for those orders.'
        ]
      },
      {
        heading: 'Website content and service providers',
        paragraphs: [
          'Our knowledge articles introduce ginseng species, origin, cultivation and preparation. Product-specific information is provided on the selected product page and its packaging.',
          'Shopify powers our commerce and customer-account functions and processes personal information as described in our privacy policy and the [Shopify Consumer Privacy Policy](https://www.shopify.com/legal/privacy/consumers). Where enhanced services are enabled, these can use information about interactions with our store, other merchants and Shopify.',
          'Use the website and its forms lawfully and provide information you are entitled to share. Website text, photographs and other material remain subject to the rights of their respective owners.'
        ]
      },
      {
        heading: 'Questions, disputes and applicable law',
        paragraphs: [
          `For an order or service problem, contact [${email}](mailto:${email}). We aim to make our first reply within two business days and work with you to resolve the issue.`,
          'The seller operates in mainland China. Chinese law applies to these terms to the extent permitted, together with any mandatory consumer protections and dispute-resolution rights applicable in your country. These terms preserve your rights to use available courts, regulators and payment dispute procedures.',
          'Updates to these terms apply prospectively. The terms and mandatory rights applicable to an accepted order continue to govern that order.'
        ]
      }
    ]
  }
};

const zhHans = {
  returns: {
    title: '退货与退款政策',
    description: '了解七天退货条件、退回运费和退款处理流程。',
    sections: [
      {
        heading: '收到商品后七天内申请退货',
        paragraphs: [
          '收到商品后七个自然日内，在商品不影响再次销售的情况下，可以申请无理由退货。',
          `请通过 [${email}](mailto:${email}) 提供订单号及需要退回的商品。申请日期以您发出申请的日期为准。我们会确认退货安排，并提供包装及寄回指引。`
        ]
      },
      {
        heading: '退回运费与原配送费',
        paragraphs: [
          '无理由退货的退回运费由买家承担。原订单中单独收取且已经发生的配送费予以保留，适用法律另有强制规定的除外。',
          '退货寄回中国。请在购买前考虑国际退货费用，并按订单对应的退货指引办理。'
        ]
      },
      {
        heading: '质量问题、运输破损或错发',
        paragraphs: [
          '如果商品存在质量问题、运输破损或与订购商品不符，请提供订单号及问题说明。有照片时，可一并提供以便核实。',
          '您可自行选择退款或补发。这些情况所需的退回运费及补发运费由我们承担。商品存在缺陷或与描述不符时，适用的法定权利不受七天无理由退货期限限制。'
        ]
      },
      {
        heading: '退货接收信息',
        paragraphs: [
          `接收单位为${company}，退货组。`,
          `退回地址为${address}。联系电话为 ${phone}。`,
          '寄出前请先联系，以便将包裹与订单关联，并确认相应寄送指引。'
        ]
      },
      {
        heading: '退款处理时间',
        paragraphs: [
          '收到退货并确认符合条件后，我们会在五个工作日内发起退款。适用法律规定更短期限时，以该期限为准。适用韩国法定撤回规则的订单，在收回退货后按适用的三个营业日期限办理退款。',
          '退款通常退回原付款渠道。退款发起后，实际到账时间由银行或支付服务商的处理时间决定。'
        ]
      },
      {
        heading: '消费者权利与联系',
        paragraphs: [
          '本政策是店铺提供的退货安排，适用的法定消费者权利、救济及期限继续有效，包括美国、日本和韩国消费者依法享有的权利。',
          `如需查询退货或退款，请联系 [${email}](mailto:${email}) 或 ${phone}。我们通常在两个工作日内首次回复。`
        ]
      }
    ]
  },
  shipping: {
    title: '发货与配送政策',
    description: '吉林产地直发、预计配送时间及运费安排。',
    sections: [
      {
        heading: '从产地直接发货',
        paragraphs: [
          '商品从中国吉林人参产区直接发出。普通现货订单计划在确认付款后三至五个工作日内交给承运商。',
          '备货工作日为周一至周五，发货地法定节假日除外。如商品需要特殊备货时间，会在接受订单前向您确认。',
          '网站正在准备线上结账。正式开放销售前，会确认可用支付方式及配送线路。'
        ]
      },
      {
        heading: '预计运输时间',
        paragraphs: [
          '美国标准配送拟采用发货后十五至二十五个工作日的运输档位，备货时间另计。最终预估以订单实际采用的承运商及线路为准。',
          '日本和韩国为计划配送市场。在接受这些目的地的订单前，会确认对应线路、商品准入及预计送达时间。',
          '航班与承运安排、清关、节假日及偏远地区派送可能影响运输时间。发现延误后，我们会提供已知进展并协助查询。'
        ]
      },
      {
        heading: '运费',
        paragraphs: [
          '可配送目的地的订单，商品金额满一百美元享标准配送包邮。未满一百美元，每单收取十美元标准运费。',
          '其他币种可显示等值金额。确认订单和结账页面会在付款前显示运费及付款币种。'
        ]
      },
      {
        heading: '进口关税与税费',
        paragraphs: [
          '我们优先准备含进口税费或可以预付税费的线路。实际线路的税费和清关安排会在接受订单前确认。',
          '由我们收取的进口费用，以及收件人可能需要在送达时支付的费用，都会在付款前披露。对目的地进口要求有疑问时，请先联系我们。'
        ]
      },
      {
        heading: '物流查询、延误与丢件',
        paragraphs: [
          '发货确认通知会提供可用的物流追踪信息。您也可以通过客户账户查看订单及配送状态。',
          '如果无法按确认的时间发货，我们会提供更新信息，让您选择同意等待或取消未发货商品并获得全额退款。',
          '承运商确认包裹丢失后，您可选择全额退款或补发，我们负责向承运商提出索赔。'
        ]
      },
      {
        heading: '联系',
        paragraphs: [
          `配送问题请联系 [${email}](mailto:${email}) 或 ${phone}。我们通常在两个工作日内首次回复。`,
          `经营主体为${company}，地址为${address}。`
        ]
      }
    ]
  },
  privacy: {
    title: '隐私政策',
    description: '了解账户资料、订单、留言及隐私选择的处理方式。',
    sections: [
      {
        heading: '个人信息处理者',
        paragraphs: [
          `Changbaishan Ginseng 由${company}经营，地址为${address}。中国大陆团队处理店铺运营、客户服务及隐私请求。`,
          `个人信息问题可联系 [${email}](mailto:${email}) 或 ${phone}。本政策更新于2026年11月12日。`
        ]
      },
      {
        heading: '收集的信息',
        paragraphs: [
          '账户和订单资料可包括姓名、邮箱、收货及账单地址、联系电话、所购商品、付款状态、退货和沟通记录。结账服务商根据其适用的隐私说明处理付款资料。',
          '联系表单保存您提交的邮箱、选填姓名和留言。订阅记录包含邮箱及营销选择。运行和安全所需的技术资料可包括IP地址、浏览器信息、页面请求及Cookie偏好。',
          '表单用于购物及一般咨询。请仅提交相应目的所需的信息，并妥善保管敏感健康资料。'
        ]
      },
      {
        heading: '信息用途',
        paragraphs: [
          '我们使用必要信息来管理账户、备货配送、提供订单及物流更新、处理咨询和退货、维护安全，以及履行法律和记录保存义务。',
          '我们在自有Cloudflare数据库中保存客户邮箱及账户标识的副本，用于客户记录及服务连续性。营销同意与注册账户或购买行为分别记录。'
        ]
      },
      {
        heading: '服务商与跨境处理',
        paragraphs: [
          'Shopify提供交易及客户账户服务，Cloudflare提供网站托管、安全及数据库服务。接受订单后，履约所需资料会提供给对应的支付及配送服务商。',
          '中国大陆团队及服务商可能在您居住国以外处理资料。我们按具体跨境传输要求提供告知、合同安排及同意程序。',
          '客户名单用于我们自身的客户关系及本政策所述服务安排。我们不向其他商家出售或出租客户名单供其独立营销。'
        ]
      },
      {
        heading: 'Shopify增强服务',
        paragraphs: [
          '店铺启用Shopify Network Intelligence时，Shopify会将您与本店的互动资料，与您和其他商家及Shopify的互动资料结合，用于个性化及广告相关等增强服务。详情见[Shopify消费者隐私政策](https://www.shopify.com/legal/privacy/consumers)。',
          '部分用途可能被适用的美国州隐私法认定为资料共享或定向广告。Shopify账户及平台层面的选择可通过[Shopify隐私门户](https://privacy.shopify.com/)管理。'
        ]
      },
      {
        heading: 'Cookie与可选统计',
        paragraphs: [
          '必要Cookie及类似存储用于购物车、登录、安全及保存偏好。可选统计和广告技术按网站提供的选择及您所在地的适用要求运行。',
          'Google Analytics属于计划配置的统计工具。实际配置并按相应控制启用后，用于衡量访问及购物活动。届时可用的可选服务以隐私控制界面为准。'
        ]
      },
      {
        heading: '邮件订阅',
        paragraphs: [
          '营销邮件以您的订阅选择为前提。您可通过邮件中的链接或联系我们退订。订单、账户及服务通知与营销订阅分别处理。',
          '配送或服务所需的电话号码用于相应目的。目前营销计划采用电子邮件。'
        ]
      },
      {
        heading: '保存期限与您的权利',
        paragraphs: [
          '资料按收集目的所需期限保存，包括履约、售后、争议处理及适用的会计或法律义务。所需期限结束后，安排删除或匿名化，法定留存要求另有规定的除外。',
          '依您所在地法律，您可能享有查阅、更正、删除、获取副本、撤回同意、反对特定处理，或退出资料共享及定向广告等权利。请求可能需要身份核验，并受适用法律例外约束。',
          `请将请求发送至 [${email}](mailto:${email})。我们通常在两个工作日内确认收到咨询，并在适用法定期限内处理。`
        ]
      },
      {
        heading: '隐私选择',
        paragraphs: [
          '您可通过[隐私选择](#privacy-choices)管理本网站的可选追踪。受支持的全球隐私控制信号会将本网站对应的广告及资料共享偏好设为退出。结账开放后，已保存的选择会传递给Shopify用于该次结账。',
          `也可通过 [${email}](mailto:${email}) 提交隐私选择或投诉。Shopify相关选择可在[Shopify隐私门户](https://privacy.shopify.com/)办理。`,
          '资料处理方式发生重大变化时，本政策会相应更新，并按适用法律要求通知您。'
        ]
      }
    ]
  },
  terms: {
    title: '用户条款',
    description: '网站使用与零售订单的交易条件。',
    sections: [
      {
        heading: '经营主体及适用范围',
        paragraphs: [
          `本网站由${company}以Changbaishan Ginseng名称经营，地址为${address}。联系方式为 [${email}](mailto:${email}) 及 ${phone}。`,
          '本条款适用于网站使用和零售购买。商品信息、确认订单、配送政策及退货政策构成相应交易安排。目前网站正在准备线上结账。'
        ]
      },
      {
        heading: '商品、价格与币种',
        paragraphs: [
          '下单前请核对选中的商品、规格、净含量和总价。人参根的外观存在自然差异，所选商品说明会列明订单包含的内容。',
          '价格以美元为基准。浏览时显示的其他币种为近似取整的参考换算价。付款前会显示实际付款币种及最终金额，支付服务商或发卡机构可能采用自身汇率及收费。'
        ]
      },
      {
        heading: '订单、库存与取消',
        paragraphs: [
          '您可以免注册购买，也可选择使用客户账户。请提供准确的联系和配送信息，以便确认并履行订单。',
          '普通订单在交给承运商之前，且在单独约定的定制加工开始前，可以取消并获得全额退款。请尽早提供订单号与我们联系。',
          '付款后发现缺货时，我们会联系您，由您选择等待或退款。调整发货时间时，会按相应要求取得顾客同意。'
        ]
      },
      {
        heading: '账户、订单与物流更新',
        paragraphs: [
          'Shopify提供客户登录、订单记录及可用的物流更新。请妥善保管用于登录的邮箱，发现订单信息有误时与我们联系。',
          '网站也会按[隐私政策](/policies/privacy/)保存客户邮箱及账户记录，用于服务管理。营销订阅单独选择。'
        ]
      },
      {
        heading: '配送、退货及批发咨询',
        paragraphs: [
          '配送安排、运费及进口费用处理方式会在付款前确认。零售安排详见[配送政策](/policies/shipping/)及[退货政策](/policies/returns/)。',
          '批发、大宗采购及定制订单先行询价，商品规格、报价、交期及售后安排另行约定。'
        ]
      },
      {
        heading: '网站内容与服务商',
        paragraphs: [
          '人参知识文章介绍品种、产地、种植及制备方式。具体商品资料以所选商品页面和包装说明为准。',
          'Shopify支持交易及客户账户功能，并按本店隐私政策及[Shopify消费者隐私政策](https://www.shopify.com/legal/privacy/consumers)处理个人资料。启用增强服务时，可使用您与本店、其他商家及Shopify的互动资料。',
          '请依法使用网站和表单，并提交您有权分享的信息。网站文字、照片及其他材料的权利归相应权利人所有。'
        ]
      },
      {
        heading: '咨询、争议及适用法律',
        paragraphs: [
          `订单或服务问题可联系 [${email}](mailto:${email})。我们通常在两个工作日内首次回复，并与您协商解决。`,
          '经营主体位于中国大陆。本条款在法律允许范围内适用中国法律，同时保留您所在国家适用的强制性消费者保护及争议解决权利。您可依法使用法院、监管机构和支付争议处理程序。',
          '条款更新对将来适用，已接受订单继续适用该订单对应的条款及法定权利。'
        ]
      }
    ]
  }
};
const zhHant = {
  returns: {
    title: '退貨與退款政策',
    description: '了解七天退貨條件、退回運費和退款處理流程。',
    sections: [
      { heading: '收到商品後七天內申請退貨', paragraphs: [
        '收到商品後七個自然日內，在商品不影響再次銷售的情況下，可以申請無理由退貨。',
        `請透過 [${email}](mailto:${email}) 提供訂單編號及需要退回的商品。申請日期以您發出申請的日期為準。我們會確認退貨安排，並提供包裝及寄回指引。`
      ] },
      { heading: '退回運費與原配送費', paragraphs: [
        '無理由退貨的退回運費由買家承擔。原訂單中單獨收取且已經發生的配送費予以保留，適用法律另有強制規定的除外。',
        '退貨寄回中國。請在購買前考慮國際退貨費用，並按訂單對應的退貨指引辦理。'
      ] },
      { heading: '品質問題、運輸破損或錯發', paragraphs: [
        '如果商品存在品質問題、運輸破損或與訂購商品不符，請提供訂單編號及問題說明。有照片時，可一併提供以便核實。',
        '您可自行選擇退款或補寄。這些情況所需的退回運費及補寄運費由我們承擔。商品存在缺陷或與描述不符時，適用的法定權利不受七天無理由退貨期限限制。'
      ] },
      { heading: '退貨接收資訊', paragraphs: [
        `接收單位為${company}，退貨組。`,
        `退回地址為${address}。聯絡電話為 ${phone}。`,
        '寄出前請先聯絡，以便將包裹與訂單關聯，並確認相應寄送指引。'
      ] },
      { heading: '退款處理時間', paragraphs: [
        '收到退貨並確認符合條件後，我們會在五個工作天內發起退款。適用法律規定更短期限時，以該期限為準。適用韓國法定撤回規則的訂單，在收回退貨後按適用的三個營業日期限辦理退款。',
        '退款通常退回原付款管道。退款發起後，實際入帳時間由銀行或支付服務商的處理時間決定。'
      ] },
      { heading: '消費者權利與聯絡', paragraphs: [
        '本政策是店鋪提供的退貨安排，適用的法定消費者權利、救濟及期限繼續有效，包括美國、日本和韓國消費者依法享有的權利。',
        `如需查詢退貨或退款，請聯絡 [${email}](mailto:${email}) 或 ${phone}。我們通常在兩個工作天內首次回覆。`
      ] }
    ]
  },
  shipping: {
    title: '出貨與配送政策',
    description: '吉林產地直送、預計配送時間及運費安排。',
    sections: [
      { heading: '從產地直接出貨', paragraphs: [
        '商品從中國吉林人參產區直接寄出。一般現貨訂單計劃在確認付款後三至五個工作天內交給承運商。',
        '備貨工作日為週一至週五，出貨地法定假日除外。如商品需要特殊備貨時間，會在接受訂單前向您確認。',
        '網站正在準備線上結帳。正式開放銷售前，會確認可用付款方式及配送路線。'
      ] },
      { heading: '預計運輸時間', paragraphs: [
        '美國標準配送擬採用出貨後十五至二十五個工作天的運輸服務，備貨時間另計。最終預估以訂單實際採用的承運商及路線為準。',
        '日本和韓國為計劃配送市場。在接受這些目的地的訂單前，會確認對應路線、商品准入及預計送達時間。',
        '航班與承運安排、清關、假日及偏遠地區派送可能影響運輸時間。發現延誤後，我們會提供已知進展並協助查詢。'
      ] },
      { heading: '運費', paragraphs: [
        '可配送目的地的訂單，商品金額滿一百美元享標準配送免運。未滿一百美元，每單收取十美元標準運費。',
        '其他幣別可顯示等值金額。確認訂單和結帳頁面會在付款前顯示運費及付款幣別。'
      ] },
      { heading: '進口關稅與稅費', paragraphs: [
        '我們優先準備含進口稅費或可以預付稅費的路線。實際路線的稅費和清關安排會在接受訂單前確認。',
        '由我們收取的進口費用，以及收件人可能需要在送達時支付的費用，都會在付款前揭露。對目的地進口要求有疑問時，請先聯絡我們。'
      ] },
      { heading: '物流查詢、延誤與遺失', paragraphs: [
        '出貨確認通知會提供可用的物流追蹤資訊。您也可以透過客戶帳戶查看訂單及配送狀態。',
        '如果無法按確認的時間出貨，我們會提供更新資訊，讓您選擇同意等待，或取消未出貨商品並獲得全額退款。',
        '承運商確認包裹遺失後，您可選擇全額退款或補寄，我們負責向承運商提出索賠。'
      ] },
      { heading: '聯絡', paragraphs: [
        `配送問題請聯絡 [${email}](mailto:${email}) 或 ${phone}。我們通常在兩個工作天內首次回覆。`,
        `經營主體為${company}，地址為${address}。`
      ] }
    ]
  },
  privacy: {
    title: '隱私政策',
    description: '了解帳戶資料、訂單、留言及隱私選擇的處理方式。',
    sections: [
      { heading: '個人資料處理者', paragraphs: [
        `Changbaishan Ginseng 由${company}經營，地址為${address}。中國大陸團隊處理店鋪營運、客戶服務及隱私請求。`,
        `個人資料問題可聯絡 [${email}](mailto:${email}) 或 ${phone}。本政策更新於2026年11月12日。`
      ] },
      { heading: '蒐集的資訊', paragraphs: [
        '帳戶和訂單資料可包括姓名、電子郵件、收貨及帳單地址、聯絡電話、所購商品、付款狀態、退貨和溝通紀錄。結帳服務商依其適用的隱私說明處理付款資料。',
        '聯絡表單保存您提交的電子郵件、選填姓名和留言。訂閱紀錄包含電子郵件及行銷選擇。運行和安全所需的技術資料可包括IP位址、瀏覽器資訊、頁面請求及Cookie偏好。',
        '表單用於購物及一般諮詢。請僅提交相應目的所需的資訊，並妥善保管敏感健康資料。'
      ] },
      { heading: '資訊用途', paragraphs: [
        '我們使用必要資訊來管理帳戶、備貨配送、提供訂單及物流更新、處理諮詢和退貨、維護安全，以及履行法律和紀錄保存義務。',
        '我們在自有Cloudflare資料庫中保存客戶電子郵件及帳戶識別資料的副本，用於客戶紀錄及服務連續性。行銷同意與註冊帳戶或購買行為分別記錄。'
      ] },
      { heading: '服務商與跨境處理', paragraphs: [
        'Shopify提供交易及客戶帳戶服務，Cloudflare提供網站託管、安全及資料庫服務。接受訂單後，履約所需資料會提供給對應的付款及配送服務商。',
        '中國大陸團隊及服務商可能在您居住國以外處理資料。我們按具體跨境傳輸要求提供告知、契約安排及同意程序。',
        '客戶名單用於我們自身的客戶關係及本政策所述服務安排。我們不向其他商家出售或出租客戶名單供其獨立行銷。'
      ] },
      { heading: 'Shopify增強服務', paragraphs: [
        '店鋪啟用Shopify Network Intelligence時，Shopify會將您與本店的互動資料，與您和其他商家及Shopify的互動資料結合，用於個人化及廣告相關等增強服務。詳情見[Shopify消費者隱私政策](https://www.shopify.com/legal/privacy/consumers)。',
        '部分用途可能被適用的美國州隱私法認定為資料共享或定向廣告。Shopify帳戶及平台層面的選擇可透過[Shopify隱私入口](https://privacy.shopify.com/)管理。'
      ] },
      { heading: 'Cookie與可選統計', paragraphs: [
        '必要Cookie及類似儲存用於購物車、登入、安全及保存偏好。可選統計和廣告技術按網站提供的選擇及您所在地的適用要求運行。',
        'Google Analytics屬於計劃設定的統計工具。實際設定並按相應控制啟用後，用於衡量造訪及購物活動。屆時可用的可選服務以隱私控制介面為準。'
      ] },
      { heading: '電子郵件訂閱', paragraphs: [
        '行銷郵件以您的訂閱選擇為前提。您可透過郵件中的連結或聯絡我們取消訂閱。訂單、帳戶及服務通知與行銷訂閱分別處理。',
        '配送或服務所需的電話號碼用於相應目的。目前行銷計劃採用電子郵件。'
      ] },
      { heading: '保存期限與您的權利', paragraphs: [
        '資料按蒐集目的所需期限保存，包括履約、售後、爭議處理及適用的會計或法律義務。所需期限結束後，安排刪除或匿名化，法定留存要求另有規定的除外。',
        '依您所在地法律，您可能享有查閱、更正、刪除、取得副本、撤回同意、反對特定處理，或退出資料共享及定向廣告等權利。請求可能需要身分核驗，並受適用法律例外約束。',
        `請將請求傳送至 [${email}](mailto:${email})。我們通常在兩個工作天內確認收到諮詢，並在適用法定期限內處理。`
      ] },
      { heading: '隱私選擇', paragraphs: [
        '您可透過[隱私選擇](#privacy-choices)管理本網站的可選追蹤。受支援的全球隱私控制訊號會將本網站對應的廣告及資料共享偏好設為退出。結帳開放後，已儲存的選擇會傳遞給Shopify用於該次結帳。',
        `也可透過 [${email}](mailto:${email}) 提交隱私選擇或投訴。Shopify相關選擇可在[Shopify隱私入口](https://privacy.shopify.com/)辦理。`,
        '資料處理方式發生重大變化時，本政策會相應更新，並按適用法律要求通知您。'
      ] }
    ]
  },
  terms: {
    title: '使用條款',
    description: '網站使用與零售訂單的交易條件。',
    sections: [
      { heading: '經營主體及適用範圍', paragraphs: [
        `本網站由${company}以Changbaishan Ginseng名稱經營，地址為${address}。聯絡方式為 [${email}](mailto:${email}) 及 ${phone}。`,
        '本條款適用於網站使用和零售購買。商品資訊、確認訂單、配送政策及退貨政策構成相應交易安排。目前網站正在準備線上結帳。'
      ] },
      { heading: '商品、價格與幣別', paragraphs: [
        '下單前請核對選中的商品、規格、淨含量和總價。人參根的外觀存在自然差異，所選商品說明會列明訂單包含的內容。',
        '價格以美元為基準。瀏覽時顯示的其他幣別為近似取整的參考換算價。付款前會顯示實際付款幣別及最終金額，付款服務商或發卡機構可能採用自身匯率及收費。'
      ] },
      { heading: '訂單、庫存與取消', paragraphs: [
        '您可以免註冊購買，也可選擇使用客戶帳戶。請提供正確的聯絡和配送資訊，以便確認並履行訂單。',
        '一般訂單在交給承運商之前，且在單獨約定的客製加工開始前，可以取消並獲得全額退款。請儘早提供訂單編號與我們聯絡。',
        '付款後發現缺貨時，我們會聯絡您，由您選擇等待或退款。調整出貨時間時，會按相應要求取得顧客同意。'
      ] },
      { heading: '帳戶、訂單與物流更新', paragraphs: [
        'Shopify提供客戶登入、訂單紀錄及可用的物流更新。請妥善保管用於登入的電子郵件帳戶，發現訂單資訊有誤時與我們聯絡。',
        '網站也會按[隱私政策](/policies/privacy/)保存客戶電子郵件及帳戶紀錄，用於服務管理。行銷訂閱單獨選擇。'
      ] },
      { heading: '配送、退貨及批發諮詢', paragraphs: [
        '配送安排、運費及進口費用處理方式會在付款前確認。零售安排詳見[配送政策](/policies/shipping/)及[退貨政策](/policies/returns/)。',
        '批發、大宗採購及客製訂單先行詢價，商品規格、報價、交期及售後安排另行約定。'
      ] },
      { heading: '網站內容與服務商', paragraphs: [
        '人參知識文章介紹品種、產地、種植及製備方式。具體商品資料以所選商品頁面和包裝說明為準。',
        'Shopify支援交易及客戶帳戶功能，並按本店隱私政策及[Shopify消費者隱私政策](https://www.shopify.com/legal/privacy/consumers)處理個人資料。啟用增強服務時，可使用您與本店、其他商家及Shopify的互動資料。',
        '請依法使用網站和表單，並提交您有權分享的資訊。網站文字、照片及其他材料的權利歸相應權利人所有。'
      ] },
      { heading: '諮詢、爭議及適用法律', paragraphs: [
        `訂單或服務問題可聯絡 [${email}](mailto:${email})。我們通常在兩個工作天內首次回覆，並與您協商解決。`,
        '經營主體位於中國大陸。本條款在法律允許範圍內適用中國法律，同時保留您所在國家適用的強制性消費者保護及爭議解決權利。您可依法使用法院、監管機構和付款爭議處理程序。',
        '條款更新對將來適用，已接受訂單繼續適用該訂單對應的條款及法定權利。'
      ] }
    ]
  }
};
const ja = {
  returns: {
    title: '返品・返金ポリシー',
    description: '到着後7日間の返品条件、返送料と返金手続きについて。',
    sections: [
      { heading: '到着後7日以内の返品申請', paragraphs: [
        '商品を受け取ってから7暦日以内で、再販売に支障のない状態であれば、お客様都合の返品を申請できます。',
        `[${email}](mailto:${email}) へ注文番号と返品する商品をご連絡ください。申請日はお客様が連絡を送信した日とします。確認後、梱包と返送の手順をご案内します。`
      ] },
      { heading: '返送料と当初の配送料', paragraphs: [
        'お客様都合の返品では、返送料はお客様のご負担となります。当初の注文で別途請求され、すでに発生した配送料は、適用法の強行規定に従う場合を除き、返金の対象から差し引きます。',
        '返送先は中国です。購入前に国際返送料をご検討いただき、ご注文に対応する返送手順に沿ってお手続きください。'
      ] },
      { heading: '品質上の問題、破損、誤配送', paragraphs: [
        '品質上の問題、配送中の破損、または注文と異なる商品が届いた場合は、注文番号と状況をお知らせください。写真があれば、確認の参考としてお送りいただけます。',
        '返金または代替商品の再発送をお選びいただけます。これらの場合に必要な返送料と再送料は当社が負担します。不良品や説明と異なる商品に関する法定の権利には、お客様都合の7日間の期限を適用しません。'
      ] },
      { heading: '返送先', paragraphs: [
        `受取先は ${company} の返品担当です。`,
        `宛先表記は「${address}，退货组」。電話番号は ${phone} です。`,
        'ご注文との照合と返送手順の確認のため、発送前にご連絡ください。'
      ] },
      { heading: '返金処理', paragraphs: [
        '返品を受領して条件を確認した後、5営業日以内に返金手続きを開始します。法律がより短い期限を定める場合は、その期限を適用します。韓国の法定撤回規則が適用される注文は、返品受領後、適用される3営業日の期限に従って返金を処理します。',
        '通常は元のお支払い方法に返金します。手続き開始後の口座への反映時期は、銀行または決済事業者の処理によって異なります。'
      ] },
      { heading: '消費者の権利とお問い合わせ', paragraphs: [
        '本ポリシーは当店の返品条件を定めるものです。米国、日本、韓国を含む、お客様の購入に適用される強行的な消費者の権利、救済と法定期限は引き続き適用されます。',
        `返品・返金のお問い合わせは [${email}](mailto:${email}) または ${phone} へご連絡ください。原則として2営業日以内の初回返信を目指します。`
      ] }
    ]
  },
  shipping: {
    title: '配送ポリシー',
    description: '吉林の産地からの発送、配送日数の目安と送料について。',
    sections: [
      { heading: '産地からの直接発送', paragraphs: [
        '商品は中国吉林省の人参産地から直接発送します。通常の在庫商品は、お支払い確認後3〜5営業日以内に配送業者へ引き渡す予定です。',
        '出荷準備の営業日は月曜日から金曜日までで、発送地の祝日を除きます。特別な準備期間が必要な商品は、注文を受け付ける前に確認します。',
        '現在オンライン決済の準備を進めています。販売開始前に、利用できる支払い方法と配送ルートを確定します。'
      ] },
      { heading: '輸送日数の目安', paragraphs: [
        '米国への標準配送では、発送後15〜25営業日の輸送サービスを予定しています。出荷準備期間は別途必要です。最終的な目安は、ご注文に利用する配送業者とルートによって決まります。',
        '日本と韓国への配送を予定しています。各国への注文を受け付ける前に、利用ルート、商品の輸入条件と配達日数の目安を確認します。',
        '運航・輸送の予定、通関、祝日、遠隔地への配達により日数が変わる場合があります。遅延が判明した際は、確認できた情報をご案内し、調査を支援します。'
      ] },
      { heading: '送料', paragraphs: [
        '配送可能な地域への標準配送は、商品合計が100米ドル以上で送料無料となります。100米ドル未満の場合は、1注文につき10米ドルの標準送料を頂きます。',
        '他通貨では相当額を表示する場合があります。お支払い前に、確定する注文と決済画面で送料および支払い通貨を表示します。'
      ] },
      { heading: '関税・輸入税', paragraphs: [
        '関税・輸入税を含むルート、または事前に納付できるルートを優先して準備しています。実際のルートの税金と通関条件は、注文を受け付ける前に確認します。',
        '当社が徴収する輸入関連費用と、お受取時にお客様が支払う必要のある費用は、お支払い前にご案内します。輸入条件に不明点がある場合は、事前にお問い合わせください。'
      ] },
      { heading: '追跡、遅延と紛失', paragraphs: [
        '発送確認通知に、利用可能な追跡情報を記載します。お客様アカウントでも注文と配送状況を確認できます。',
        '確認した期間内に発送できない場合は、新しい情報をご案内し、お待ちいただくか、未発送商品をキャンセルして全額返金を受けるかをお選びいただきます。',
        '配送業者が荷物の紛失を確認した場合は、全額返金または再発送をお選びいただけます。配送業者への請求は当社が行います。'
      ] },
      { heading: 'お問い合わせ', paragraphs: [
        `配送については [${email}](mailto:${email}) または ${phone} へご連絡ください。原則として2営業日以内の初回返信を目指します。`,
        `販売事業者は ${company}、所在地は ${address} です。`
      ] }
    ]
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: 'アカウント、注文、メッセージおよびプライバシー設定の取り扱い。',
    sections: [
      { heading: '個人情報の取り扱い事業者', paragraphs: [
        `Changbaishan Ginseng の運営者は ${company}、所在地は ${address} です。中国本土のチームが運営、お客様対応とプライバシーに関する請求を担当します。`,
        `個人情報のお問い合わせは [${email}](mailto:${email}) または ${phone} へご連絡ください。本ポリシーの更新日は2026年11月12日です。`
      ] },
      { heading: '取得する情報', paragraphs: [
        'アカウントと注文に関する情報には、氏名、メールアドレス、配送先・請求先住所、電話番号、購入商品、支払い状況、返品と連絡の履歴が含まれます。決済事業者は、それぞれの適用される通知に基づいて支払い情報を処理します。',
        'お問い合わせフォームでは、入力されたメールアドレス、任意の氏名とメッセージを保存します。購読記録にはメールアドレスとマーケティングに関する選択を記録します。運営と安全のため、IPアドレス、ブラウザー情報、ページへの要求やCookie設定などの技術情報を扱う場合があります。',
        'フォームは購入と一般的なお問い合わせにご利用ください。医療記録、病状の詳細など、機微な健康情報はメッセージに含めずにお送りください。'
      ] },
      { heading: '利用目的', paragraphs: [
        'アカウント管理、出荷準備と配送、注文・配送の通知、お問い合わせと返品への対応、安全の維持、および法律・記録保存上の義務を果たすために必要な情報を利用します。',
        '当社のCloudflareデータベースに、お客様のメールアドレスとアカウント識別子のコピーを保存し、顧客記録と継続的なサービスに利用します。マーケティングへの同意は、登録や購入とは別に記録します。'
      ] },
      { heading: 'サービス事業者と国外での処理', paragraphs: [
        'Shopifyは商取引とお客様アカウントの機能を提供します。Cloudflareはウェブサイトのホスティング、安全対策とデータベースを提供します。注文を受け付けた後、履行に必要な情報を決済・配送事業者に提供します。',
        '中国本土の当社チームとサービス事業者は、お客様の居住国以外で情報を処理する場合があります。該当する移転に必要な通知、契約上の措置と同意手続きを行います。',
        '顧客リストは当社自身のお客様との関係と本ポリシーに記載するサービスのために使用します。他の販売事業者が独自にマーケティングを行う目的で、リストを販売・貸与することはありません。'
      ] },
      { heading: 'Shopifyの拡張サービス', paragraphs: [
        '当店でShopify Network Intelligenceを有効にした場合、Shopifyは当店とのやり取りに関する情報を、他の販売事業者やShopifyとのやり取りと合わせ、パーソナライズや広告関連などの拡張サービスに利用します。[Shopifyの消費者向けプライバシーポリシー](https://www.shopify.com/legal/privacy/consumers)をご覧ください。',
        '米国の一部の州法では、こうした利用が情報の共有またはターゲティング広告に当たる場合があります。Shopifyアカウントとプラットフォーム全体の選択は、[Shopifyのプライバシーポータル](https://privacy.shopify.com/)で管理できます。'
      ] },
      { heading: 'Cookieと任意のアクセス解析', paragraphs: [
        '必須Cookieと同様の保存機能は、カート、ログイン、安全対策と設定の保存に使用します。任意の解析・広告技術は、サイトでの選択とお客様の地域に適用される要件に従って動作します。',
        'Google Analyticsは導入を予定している解析サービスです。設定後、該当する管理機能に従って有効にした場合、訪問と購入行動の測定に利用します。その時点で利用できる任意のサービスは、プライバシー管理画面でご確認いただけます。'
      ] },
      { heading: 'メールの購読', paragraphs: [
        'マーケティングメールは、お客様の購読の選択に基づいて配信します。メールのリンクまたは当社への連絡で購読を解除できます。注文、アカウントとサービスの通知は、マーケティングの購読とは別に扱います。',
        '配送やサービスのために頂いた電話番号は、その目的で使用します。現在のマーケティング計画は電子メールを用います。'
      ] },
      { heading: '保存期間とお客様の権利', paragraphs: [
        '情報は、注文の履行、サービス、紛争対応、会計・法的義務を含む取得目的に必要な期間保存します。その後、法定の保存義務がある場合を考慮して、削除または匿名化を行います。',
        '居住地によって、情報へのアクセス、訂正、削除、コピーの取得、同意の撤回、一定の処理への異議申立て、情報の共有・ターゲティング広告からのオプトアウトなどの権利が認められる場合があります。本人確認と適用法上の例外が適用される場合があります。',
        `請求は [${email}](mailto:${email}) へお送りください。原則として2営業日以内に受領をご案内し、適用される法定期間内に対応します。`
      ] },
      { heading: 'プライバシーの選択', paragraphs: [
        '[プライバシーの選択](#privacy-choices)では、このサイトの任意のトラッキングを管理できます。対応するGlobal Privacy Control信号により、このサイトの該当する広告とデータ共有の設定をオプトアウトにします。チェックアウトの提供開始後、保存した選択を、そのチェックアウトのためにShopifyへ送信します。',
        `プライバシーの選択や苦情は [${email}](mailto:${email}) でも受け付けます。Shopifyに関する選択は[Shopifyのプライバシーポータル](https://privacy.shopify.com/)でも行えます。`,
        '情報の取り扱いに重要な変更がある場合は、本ポリシーを更新し、適用法で必要となる通知を行います。'
      ] }
    ]
  },
  terms: {
    title: '利用規約',
    description: 'ウェブサイトの利用と個人向け商品の購入条件。',
    sections: [
      { heading: '販売事業者と適用範囲', paragraphs: [
        `本サイトは ${company} がChangbaishan Ginsengの名称で運営しています。所在地は ${address}、連絡先は [${email}](mailto:${email}) および ${phone} です。`,
        '本規約はサイトの利用と小売購入に適用します。商品情報、確認した注文、配送ポリシーと返品ポリシーが購入条件を構成します。現在、オンライン決済の準備を進めています。'
      ] },
      { heading: '商品、価格と通貨', paragraphs: [
        '注文前に、選択した商品、仕様、内容量と合計金額をご確認ください。人参の根の外観には自然な個体差があります。選択した商品の説明に、注文内容を記載します。',
        '基準価格は米ドルです。他通貨の表示額は、閲覧用に概算・丸め処理した換算額です。実際のお支払い通貨と確定額は支払い前に表示します。決済事業者やカード発行会社が独自の為替換算や手数料を適用する場合があります。'
      ] },
      { heading: '注文、在庫とキャンセル', paragraphs: [
        '会員登録なしで購入するか、お客様アカウントを利用するかを選択できます。確認と配送のため、正確な連絡先と住所をご入力ください。',
        '通常の注文は、配送業者への引き渡し前、かつ別途合意した特注加工の開始前であれば、キャンセルして全額返金を受けられます。注文番号を添えてお早めにご連絡ください。',
        'お支払い後に在庫切れが判明した場合は、お待ちいただくか返金を受けるかをお選びいただきます。発送日の変更は、必要なお客様の合意に基づいて行います。'
      ] },
      { heading: 'アカウント、注文と配送状況', paragraphs: [
        'Shopifyがログイン、注文履歴と利用可能な配送状況を提供します。ログイン用メールアカウントを安全に管理し、注文内容に誤りがある場合はご連絡ください。',
        '当サイトも、[プライバシーポリシー](/policies/privacy/)に従い、サービス管理のためにお客様のメールアドレスとアカウント記録を保存します。マーケティングの購読は別の選択です。'
      ] },
      { heading: '配送、返品と卸売のお問い合わせ', paragraphs: [
        '配送条件、送料と輸入関連費用の取り扱いは、お支払い前に確認します。小売の条件は[配送ポリシー](/policies/shipping/)と[返品ポリシー](/policies/returns/)をご覧ください。',
        '卸売、大口・特注注文はお問い合わせから承ります。仕様、見積もり、納期とアフターサービスは個別に合意します。'
      ] },
      { heading: 'サイトの内容とサービス事業者', paragraphs: [
        '人参の知識記事では、種類、産地、栽培と調製方法を紹介します。個々の商品に関する情報は、選択した商品ページと包装の表示をご確認ください。',
        'Shopifyは商取引とお客様アカウント機能を提供し、当店のプライバシーポリシーと[Shopifyの消費者向けプライバシーポリシー](https://www.shopify.com/legal/privacy/consumers)に従って個人情報を処理します。有効になっている拡張サービスでは、当店、他の販売事業者とShopifyとのやり取りに関する情報を利用する場合があります。',
        'サイトとフォームは法令に従って利用し、共有する権利を有する情報をご提供ください。文章、写真などの素材は、それぞれの権利者の権利に従います。'
      ] },
      { heading: 'お問い合わせ、紛争と適用法', paragraphs: [
        `注文やサービスの問題は [${email}](mailto:${email}) へご連絡ください。原則として2営業日以内の初回返信を目指し、お客様と解決を図ります。`,
        '販売事業者は中国本土で事業を行っています。本規約には、認められる範囲で中国法を適用するとともに、お客様の国で適用される強行的な消費者保護と紛争解決の権利を保全します。裁判所、規制機関と決済上の紛争処理を利用する権利は引き続き認められます。',
        '規約の変更は将来に向かって適用します。受け付け済みの注文には、その注文に適用される規約と法定の権利が引き続き適用されます。'
      ] }
    ]
  }
};
const ko = {
  returns: {
    title: '반품 및 환불 정책',
    description: '수령 후 7일 반품 조건, 반송 비용과 환불 절차를 안내합니다.',
    sections: [
      { heading: '수령 후 7일 이내 반품 신청', paragraphs: [
        '상품을 받은 후 7일 이내에 재판매에 지장이 없는 상태라면 단순 변심에 따른 반품을 신청할 수 있습니다. 이 기간은 달력일 기준입니다.',
        `[${email}](mailto:${email})로 주문번호와 반품할 상품을 알려 주세요. 신청일은 고객이 요청을 보낸 날짜를 기준으로 합니다. 확인 후 포장과 반송 방법을 안내합니다.`
      ] },
      { heading: '반송 비용과 최초 배송비', paragraphs: [
        '단순 변심 반품의 반송 비용은 고객이 부담합니다. 최초 주문에서 별도로 청구되어 이미 발생한 배송비는 관련 강행 법규에 따른 경우를 제외하고 환불 금액에서 제외됩니다.',
        '반품 주소는 중국에 있습니다. 주문 전에 국제 반송 비용을 고려하고, 해당 주문에 제공된 반품 안내에 따라 보내 주세요.'
      ] },
      { heading: '품질 문제, 파손 또는 오배송', paragraphs: [
        '품질 문제, 운송 중 파손 또는 주문과 다른 상품이 도착한 경우 주문번호와 문제 내용을 알려 주세요. 사진이 있으면 확인에 도움이 됩니다.',
        '환불 또는 재발송 중에서 선택할 수 있습니다. 이러한 문제에 필요한 반송 비용과 재발송 비용은 당사가 부담합니다. 하자나 표시 내용과 다른 상품에 관한 법정 권리는 단순 변심에 적용되는 7일 기간으로 제한되지 않습니다.'
      ] },
      { heading: '반품 주소', paragraphs: [
        `수취인은 ${company} 반품 담당팀입니다.`,
        `택배에 기재할 중국어 주소는 “${address}，退货组”이며, 연락처는 ${phone}입니다.`,
        '발송 전에 연락해 주시면 주문과 반품 택배를 연결하고 반송 방법을 확인해 드립니다.'
      ] },
      { heading: '환불 처리', paragraphs: [
        '반품을 수령하고 조건을 확인한 후 5영업일 이내에 환불을 요청합니다. 법률에서 더 짧은 기한을 정한 경우 그 기한을 적용합니다. 한국의 법정 청약철회 규정이 적용되는 주문은 반품 수령 후 해당 3영업일 기한에 따라 환급합니다.',
        '환불은 통상 기존 결제수단으로 이루어집니다. 환불 요청 후 실제 계좌 반영 시점은 은행 또는 결제사업자의 처리 일정에 따라 달라집니다.'
      ] },
      { heading: '소비자 권리 및 문의', paragraphs: [
        '이 정책은 당사의 반품 절차를 정합니다. 미국, 일본, 한국을 포함하여 해당 구매에 적용되는 강행적 소비자 권리, 구제수단과 법정 기한은 계속 적용됩니다.',
        `반품 및 환불 문의는 [${email}](mailto:${email}) 또는 ${phone}로 연락해 주세요. 통상 2영업일 이내에 첫 답변을 드리도록 합니다.`
      ] }
    ]
  },
  shipping: {
    title: '배송 정책',
    description: '중국 지린 산지 직배송, 예상 배송 기간 및 배송비를 안내합니다.',
    sections: [
      { heading: '산지에서 직접 발송', paragraphs: [
        '상품은 중국 지린성의 인삼 생산지에서 직접 발송합니다. 일반 재고 상품은 결제 확인 후 3~5영업일 이내에 운송업체에 인계할 예정입니다.',
        '출고 준비 영업일은 월요일부터 금요일까지이며, 발송지 공휴일은 제외합니다. 특별한 준비 기간이 필요한 경우 주문 접수 전에 안내합니다.',
        '현재 온라인 결제를 준비하고 있습니다. 판매 개시 전에 이용 가능한 결제수단과 배송 경로를 확인합니다.'
      ] },
      { heading: '예상 운송 기간', paragraphs: [
        '미국 표준배송은 발송 후 15~25영업일의 운송 서비스를 계획하고 있습니다. 출고 준비 기간은 별도입니다. 최종 예상 기간은 실제 주문에 이용하는 운송업체와 경로에 따라 정해집니다.',
        '일본과 한국은 배송 예정 시장입니다. 해당 국가의 주문을 접수하기 전에 배송 경로, 상품 수입 가능 여부와 예상 배송 기간을 확인합니다.',
        '운송 일정, 통관, 공휴일 및 도서산간 배송은 운송 기간에 영향을 줄 수 있습니다. 지연을 확인하면 알려진 진행 상황을 안내하고 조회를 돕습니다.'
      ] },
      { heading: '배송비', paragraphs: [
        '배송 가능한 지역의 주문은 상품 금액이 미화 100달러 이상이면 표준배송이 무료입니다. 미화 100달러 미만은 주문당 표준배송비 10달러가 부과됩니다.',
        '다른 통화로 해당 금액을 표시할 수 있습니다. 결제 전에 확정 주문과 결제 화면에서 배송비와 결제 통화를 표시합니다.'
      ] },
      { heading: '관세 및 수입 세금', paragraphs: [
        '관세와 수입 세금이 포함되거나 선납할 수 있는 경로를 우선 준비합니다. 실제 배송 경로의 세금 및 통관 조건은 주문 접수 전에 확인합니다.',
        '당사가 수령하는 수입 관련 비용과 수취인이 도착 시 납부해야 하는 비용은 결제 전에 안내합니다. 수입 요건이 불확실하면 먼저 문의해 주세요.'
      ] },
      { heading: '배송 조회, 지연 및 분실', paragraphs: [
        '출고 확인 안내에서 이용 가능한 배송 조회 정보를 제공합니다. 고객 계정에서도 주문 및 배송 상태를 확인할 수 있습니다.',
        '확인한 기간에 발송하기 어려운 경우 변경 정보를 안내하고, 기다리는 데 동의하거나 미발송 상품을 취소하여 전액 환불받는 선택을 제공합니다.',
        '운송업체가 택배 분실을 확인하면 전액 환불 또는 재발송 중에서 선택할 수 있습니다. 운송업체에 대한 배상 청구는 당사가 처리합니다.'
      ] },
      { heading: '문의', paragraphs: [
        `배송 문의는 [${email}](mailto:${email}) 또는 ${phone}로 연락해 주세요. 통상 2영업일 이내에 첫 답변을 드리도록 합니다.`,
        `판매자는 ${company}이며, 주소는 ${address}입니다.`
      ] }
    ]
  },
  privacy: {
    title: '개인정보 처리방침',
    description: '계정, 주문, 문의 내용과 개인정보 선택의 처리 방식을 안내합니다.',
    sections: [
      { heading: '개인정보 처리 주체', paragraphs: [
        `Changbaishan Ginseng은 ${company}가 운영하며, 주소는 ${address}입니다. 중국 본토의 팀이 스토어 운영, 고객 서비스 및 개인정보 요청을 담당합니다.`,
        `개인정보 문의는 [${email}](mailto:${email}) 또는 ${phone}로 연락해 주세요. 이 방침의 수정일은 2026년 11월 12일입니다.`
      ] },
      { heading: '수집 정보', paragraphs: [
        '계정 및 주문 정보에는 이름, 이메일, 배송지와 청구지 주소, 전화번호, 구매 상품, 결제 상태, 반품 및 상담 기록이 포함될 수 있습니다. 결제사업자는 각자의 적용되는 고지에 따라 결제 정보를 처리합니다.',
        '문의 양식에는 고객이 제공한 이메일, 선택 입력한 이름과 메시지가 저장됩니다. 구독 기록에는 이메일과 마케팅 선택을 기록합니다. 운영과 보안을 위한 기술 정보에는 IP 주소, 브라우저 정보, 페이지 요청과 쿠키 설정이 포함될 수 있습니다.',
        '양식은 구매 및 일반 문의에 이용해 주세요. 의료기록, 질병 상세 내용과 기타 민감한 건강정보는 메시지에 포함하지 말아 주세요.'
      ] },
      { heading: '이용 목적', paragraphs: [
        '계정 관리, 출고 및 배송, 주문·배송 알림, 문의와 반품 처리, 보안 유지, 법적 의무와 기록 보관에 필요한 정보를 이용합니다.',
        '고객 기록과 서비스 연속성을 위해 자체 Cloudflare 데이터베이스에 고객 이메일과 계정 식별정보의 사본을 보관합니다. 마케팅 동의는 계정 등록이나 구매와 별도로 기록합니다.'
      ] },
      { heading: '서비스 제공업체 및 국외 처리', paragraphs: [
        'Shopify는 상거래 및 고객 계정 서비스를 제공합니다. Cloudflare는 웹사이트 호스팅, 보안 및 데이터베이스 서비스를 제공합니다. 주문 접수 후 이행에 필요한 정보는 해당 결제 및 배송사업자에게 제공됩니다.',
        '중국 본토의 당사 팀과 서비스 제공업체는 고객의 거주 국가 외에서 정보를 처리할 수 있습니다. 해당 이전에 필요한 고지, 계약상 조치와 동의 절차를 적용합니다.',
        '고객 명단은 당사 고객 관계와 이 방침에 기재한 서비스 운영에 이용합니다. 다른 판매자가 독자적인 마케팅을 하도록 고객 명단을 판매하거나 대여하지 않습니다.'
      ] },
      { heading: 'Shopify 향상된 서비스', paragraphs: [
        '스토어에서 Shopify Network Intelligence가 활성화된 경우 Shopify는 이 스토어와의 상호작용 정보를 다른 판매자 및 Shopify와의 상호작용과 함께 처리하여 개인화와 광고 관련 기능 등의 향상된 서비스를 제공합니다. [Shopify 소비자 개인정보 처리방침](https://www.shopify.com/legal/privacy/consumers)을 참고해 주세요.',
        '일부 이용은 미국 일부 주의 개인정보법상 공유 또는 맞춤형 광고에 해당할 수 있습니다. Shopify 계정 및 플랫폼 전체의 선택은 [Shopify 개인정보 포털](https://privacy.shopify.com/)에서 관리할 수 있습니다.'
      ] },
      { heading: '쿠키 및 선택적 분석', paragraphs: [
        '필수 쿠키와 유사 저장 기능은 장바구니, 로그인, 보안과 설정 저장을 지원합니다. 선택적 분석 및 광고 기술은 사이트에 표시된 선택과 고객 지역의 적용 요건에 따라 작동합니다.',
        'Google Analytics는 도입 예정인 분석 도구입니다. 설정 후 해당 제어에 따라 활성화되면 방문 및 쇼핑 활동을 측정하는 데 사용합니다. 당시 이용 가능한 선택적 서비스는 개인정보 제어 화면에 안내됩니다.'
      ] },
      { heading: '이메일 구독', paragraphs: [
        '마케팅 이메일은 고객의 구독 선택에 따라 발송합니다. 이메일의 링크 또는 당사에 연락하여 구독을 해지할 수 있습니다. 주문, 계정과 서비스 알림은 마케팅 구독과 별도로 처리합니다.',
        '배송이나 서비스를 위해 제공한 전화번호는 해당 목적으로 사용합니다. 현재 마케팅 계획은 이메일을 이용합니다.'
      ] },
      { heading: '보관 기간 및 고객 권리', paragraphs: [
        '정보는 주문 이행, 서비스, 분쟁 처리 및 관련 회계·법적 의무를 포함한 수집 목적에 필요한 기간 동안 보관합니다. 그 후 법정 보관 의무를 고려하여 삭제 또는 익명화를 진행합니다.',
        '거주 지역에 따라 열람, 정정, 삭제, 사본 제공, 동의 철회, 특정 처리에 대한 이의 제기, 정보 공유나 맞춤형 광고의 거부 등의 권리가 인정될 수 있습니다. 본인 확인 및 관련 법률상 예외가 적용될 수 있습니다.',
        `요청은 [${email}](mailto:${email})로 보내 주세요. 통상 2영업일 이내에 접수 안내를 드리고 적용되는 법정 기간 안에 처리합니다.`
      ] },
      { heading: '개인정보 선택', paragraphs: [
        '[개인정보 선택](#privacy-choices)에서 이 웹사이트의 선택적 추적을 관리할 수 있습니다. 지원되는 Global Privacy Control 신호는 이 사이트의 해당 광고 및 정보 공유 설정을 거부로 적용합니다. 결제가 제공되면 저장된 선택을 해당 결제를 위해 Shopify에 전달합니다.',
        `개인정보 선택이나 불만 사항은 [${email}](mailto:${email})로도 보낼 수 있습니다. Shopify 관련 선택은 [Shopify 개인정보 포털](https://privacy.shopify.com/)에서도 가능합니다.`,
        '정보 처리 방식에 중요한 변경이 있으면 이 방침을 갱신하고 적용 법률에서 요구하는 안내를 제공합니다.'
      ] }
    ]
  },
  terms: {
    title: '이용약관',
    description: '웹사이트 이용과 소매 주문에 적용되는 거래 조건입니다.',
    sections: [
      { heading: '판매자와 적용 범위', paragraphs: [
        `이 웹사이트는 ${company}가 Changbaishan Ginseng 이름으로 운영합니다. 주소는 ${address}이며, 연락처는 [${email}](mailto:${email}) 및 ${phone}입니다.`,
        '이 약관은 웹사이트 이용과 소매 구매에 적용됩니다. 상품 정보, 확인한 주문, 배송 정책 및 반품 정책이 구매 조건을 구성합니다. 현재 온라인 결제를 준비하고 있습니다.'
      ] },
      { heading: '상품, 가격과 통화', paragraphs: [
        '주문 전에 선택한 상품, 옵션, 순중량 및 총금액을 확인해 주세요. 인삼 뿌리의 외관에는 자연적인 개체 차이가 있습니다. 선택한 상품 설명에 주문에 포함되는 내용을 안내합니다.',
        '기준 가격은 미국 달러입니다. 다른 통화의 표시 가격은 탐색 편의를 위해 근사·반올림한 환산액입니다. 실제 결제 통화와 확정 금액은 결제 전에 표시합니다. 결제사업자나 카드 발급사는 자체 환율 또는 수수료를 적용할 수 있습니다.'
      ] },
      { heading: '주문, 재고와 취소', paragraphs: [
        '비회원으로 구매하거나 고객 계정을 이용할 수 있습니다. 주문 확인과 배송을 위해 정확한 연락처와 주소를 제공해 주세요.',
        '일반 주문은 운송업체에 인계하기 전이고 별도로 합의한 맞춤 가공이 시작되기 전이면 취소하고 전액 환불받을 수 있습니다. 주문번호와 함께 신속히 연락해 주세요.',
        '결제 후 품절이 확인되면 기다리거나 환불받는 선택을 안내합니다. 변경된 발송 일정은 필요한 고객 동의에 따라 처리합니다.'
      ] },
      { heading: '계정, 주문과 배송 상태', paragraphs: [
        'Shopify가 고객 로그인, 주문 기록과 이용 가능한 배송 업데이트를 제공합니다. 로그인에 사용하는 이메일 계정을 안전하게 관리하고 주문에 오류가 있으면 연락해 주세요.',
        '웹사이트도 [개인정보 처리방침](/policies/privacy/)에 따라 서비스 관리를 위한 고객 이메일과 계정 기록을 보관합니다. 마케팅 구독은 별도로 선택합니다.'
      ] },
      { heading: '배송, 반품 및 도매 문의', paragraphs: [
        '배송 조건, 배송비와 수입 관련 비용 처리 방식은 결제 전에 확인합니다. 소매 조건은 [배송 정책](/policies/shipping/) 및 [반품 정책](/policies/returns/)을 참고해 주세요.',
        '도매, 대량 및 맞춤 주문은 문의부터 진행합니다. 상품 사양, 견적, 납기와 사후 서비스는 별도로 합의합니다.'
      ] },
      { heading: '웹사이트 콘텐츠와 서비스 제공업체', paragraphs: [
        '인삼 지식 글은 품종, 산지, 재배와 준비 방법을 소개합니다. 개별 상품의 정보는 선택한 상품 페이지와 포장 표시를 확인해 주세요.',
        'Shopify는 상거래 및 고객 계정 기능을 지원하며 당사 방침 및 [Shopify 소비자 개인정보 처리방침](https://www.shopify.com/legal/privacy/consumers)에 따라 개인정보를 처리합니다. 향상된 서비스가 활성화된 경우 당사 스토어, 다른 판매자 및 Shopify와의 상호작용 정보를 사용할 수 있습니다.',
        '웹사이트와 양식은 적법하게 이용하고 공유할 권한이 있는 정보를 제공해 주세요. 글, 사진과 기타 자료에는 각 권리자의 권리가 적용됩니다.'
      ] },
      { heading: '문의, 분쟁 및 적용 법률', paragraphs: [
        `주문 또는 서비스 문제는 [${email}](mailto:${email})로 연락해 주세요. 통상 2영업일 이내에 첫 답변을 드리고 함께 해결하도록 합니다.`,
        '판매자는 중국 본토에서 운영됩니다. 허용되는 범위에서 이 약관에 중국 법률을 적용하며 고객 국가에 적용되는 강행적 소비자 보호 및 분쟁 해결 권리는 보장됩니다. 이용 가능한 법원, 규제기관과 결제 분쟁 처리 절차를 이용할 권리는 유지됩니다.',
        '약관 변경은 장래에 적용됩니다. 접수된 주문에는 해당 주문의 약관과 법정 권리가 계속 적용됩니다.'
      ] }
    ]
  }
};

export const policyPages = ['returns', 'shipping', 'privacy', 'terms'].map(slug => ({
  slug,
  translations: { en: en[slug], ja: ja[slug], ko: ko[slug], 'zh-Hans': zhHans[slug], 'zh-Hant': zhHant[slug] }
}));
