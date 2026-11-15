import type { Language } from "../schema";

/** Text for trusted numbers, read aloud / voice, the workshop kit, follow-up questions and link checks. */
export type FeatureStrings = {
  trusted: {
    title: string;
    intro: string;
    bankName: string;
    bankNamePh: string;
    bankPhone: string;
    bankHint: string;
    familyName: string;
    familyNamePh: string;
    familyPhone: string;
    save: string;
    saved: string;
    clear: string;
    add: string;
    edit: string;
    callBank: string; // {name}
    textFamily: string; // {name}
    textBody: string; // {verdict}
    homeTitle: string;
    homeBody: string;
  };
  speech: { readAloud: string; stop: string; speak: string; listening: string; privacy: string };
  workshop: {
    navLabel: string;
    eyebrow: string;
    title: string;
    intro: string;
    presentTitle: string;
    presentBody: string;
    presentCta: string;
    handoutTitle: string;
    handoutBody: string;
    handoutCta: string;
    tipsTitle: string;
    tips: string[];
    reveal: string;
    next: string;
    prev: string;
    exit: string;
    keys: string;
    print: string;
    handoutHeading: string;
    handoutCardTitle: string;
    handoutCardLines: string[];
    handoutRule: string;
    handoutCheck: string;
  };
  followup: {
    title: string;
    intro: string;
    placeholder: string;
    ask: string;
    thinking: string;
    stepsLabel: string;
    limit: string;
    error: string;
    you: string;
  };
  form: { paste: string; clear: string; pasteFailed: string; imageDrop: string; cancel: string };
  link: { lookalike: string; shortener: string }; // lookalike: {brand}
};

const en: FeatureStrings = {
  trusted: {
    title: "My trusted numbers",
    intro: "Save the real numbers you'd call to check something. They stay on this phone only.",
    bankName: "Your bank",
    bankNamePh: "For example: Chase",
    bankPhone: "Your bank's phone number",
    bankHint: "It's on the back of your bank card.",
    familyName: "Someone you trust",
    familyNamePh: "For example: my daughter Priya",
    familyPhone: "Their phone number",
    save: "Save",
    saved: "Saved on this phone.",
    clear: "Remove my numbers",
    add: "Add my trusted numbers",
    edit: "Change my trusted numbers",
    callBank: "Call {name}",
    textFamily: "Text {name} about this",
    textBody: "Can you look at a message with me? ScamShield says: {verdict}",
    homeTitle: "Keep your trusted numbers close",
    homeBody: "Save your bank's real number and someone you trust. When a message looks wrong, they're one tap away.",
  },
  speech: {
    readAloud: "Read aloud",
    stop: "Stop reading",
    speak: "Speak instead",
    listening: "Listening… tap to stop",
    privacy: "Voice typing uses your phone's or browser's own speech service.",
  },
  workshop: {
    navLabel: "Workshop kit",
    eyebrow: "For groups",
    title: "Workshop kit",
    intro: "Run a 20-minute scam-awareness session at a Rotary club, library, senior center or place of worship. No sign-up, works with any projector.",
    presentTitle: "Presenter mode",
    presentBody: "Show the 8 practice messages in big text. The room decides, then you reveal the clues.",
    presentCta: "Start presenting",
    handoutTitle: "Printable handout",
    handoutBody: "One page per person: the common scams, the warning signs, and a card to write their trusted numbers on.",
    handoutCta: "Open the handout",
    tipsTitle: "How to run it",
    tips: [
      "Start with a show of hands: who has received a strange text or call this month?",
      "Go through the practice messages. Let people vote before you reveal each answer.",
      "Hand out the sheet and help everyone fill in their trusted numbers.",
      "Finish by checking a real message someone in the room received.",
    ],
    reveal: "Show the answer",
    next: "Next",
    prev: "Back",
    exit: "Exit",
    keys: "Arrow keys or space bar also work.",
    print: "Print",
    handoutHeading: "Spot a scam before it costs you",
    handoutCardTitle: "My trusted numbers",
    handoutCardLines: ["My bank", "Someone I trust", "My doctor or pharmacy"],
    handoutRule: "When in doubt: hang up, don't click, and call a number you already trust.",
    handoutCheck: "Check any message for free:",
  },
  followup: {
    title: "Questions about this message?",
    intro: "Ask anything about this message or what to do next. For example: \"What if I already replied?\"",
    placeholder: "Type your question",
    ask: "Ask",
    thinking: "Finding an answer…",
    stepsLabel: "Step by step",
    limit: "That's the limit of questions for this message. For more help, see Get help or talk to someone you trust.",
    error: "We couldn't answer that right now. Please try again.",
    you: "You asked",
  },
  form: {
    paste: "Paste message",
    clear: "Clear",
    pasteFailed: "Couldn't paste. Press and hold in the box, then tap Paste.",
    imageDrop: "You can also paste a picture or drag it here.",
    cancel: "Cancel",
  },
  link: {
    lookalike: "This link uses the name {brand}, but it isn't {brand}'s real website.",
    shortener: "This is a shortened link, so you can't see where it really goes.",
  },
};

const es: FeatureStrings = {
  trusted: {
    title: "Mis números de confianza",
    intro: "Guarde los números reales a los que llamaría para verificar algo. Se quedan solo en este teléfono.",
    bankName: "Su banco",
    bankNamePh: "Por ejemplo: Chase",
    bankPhone: "El teléfono de su banco",
    bankHint: "Está detrás de su tarjeta bancaria.",
    familyName: "Alguien de confianza",
    familyNamePh: "Por ejemplo: mi hija Priya",
    familyPhone: "Su número de teléfono",
    save: "Guardar",
    saved: "Guardado en este teléfono.",
    clear: "Borrar mis números",
    add: "Agregar mis números de confianza",
    edit: "Cambiar mis números de confianza",
    callBank: "Llamar a {name}",
    textFamily: "Escribirle a {name} sobre esto",
    textBody: "¿Puedes revisar un mensaje conmigo? ScamShield dice: {verdict}",
    homeTitle: "Tenga a mano sus números de confianza",
    homeBody: "Guarde el número real de su banco y el de alguien de confianza. Si un mensaje parece raro, estarán a un toque.",
  },
  speech: {
    readAloud: "Leer en voz alta",
    stop: "Dejar de leer",
    speak: "Hablar en vez de escribir",
    listening: "Escuchando… toque para parar",
    privacy: "El dictado usa el servicio de voz de su teléfono o navegador.",
  },
  workshop: {
    navLabel: "Kit para talleres",
    eyebrow: "Para grupos",
    title: "Kit para talleres",
    intro: "Haga una sesión de 20 minutos sobre estafas en un club Rotario, biblioteca, centro para mayores o iglesia. Sin registrarse, con cualquier proyector.",
    presentTitle: "Modo presentación",
    presentBody: "Muestre los 8 mensajes de práctica en letra grande. El grupo decide y luego usted revela las pistas.",
    presentCta: "Empezar a presentar",
    handoutTitle: "Hoja para imprimir",
    handoutBody: "Una página por persona: las estafas comunes, las señales de alerta y una tarjeta para anotar sus números de confianza.",
    handoutCta: "Abrir la hoja",
    tipsTitle: "Cómo hacerlo",
    tips: [
      "Empiece preguntando: ¿quién recibió un mensaje o llamada extraña este mes?",
      "Pase los mensajes de práctica. Deje que voten antes de revelar cada respuesta.",
      "Reparta la hoja y ayude a todos a anotar sus números de confianza.",
      "Termine revisando un mensaje real que haya recibido alguien del grupo.",
    ],
    reveal: "Mostrar la respuesta",
    next: "Siguiente",
    prev: "Atrás",
    exit: "Salir",
    keys: "También funcionan las flechas o la barra espaciadora.",
    print: "Imprimir",
    handoutHeading: "Detecte una estafa antes de que le cueste",
    handoutCardTitle: "Mis números de confianza",
    handoutCardLines: ["Mi banco", "Alguien de confianza", "Mi médico o farmacia"],
    handoutRule: "Si tiene dudas: cuelgue, no haga clic y llame a un número en el que ya confía.",
    handoutCheck: "Revise cualquier mensaje gratis:",
  },
  followup: {
    title: "¿Preguntas sobre este mensaje?",
    intro: "Pregunte lo que quiera sobre este mensaje o qué hacer. Por ejemplo: \"¿Y si ya respondí?\"",
    placeholder: "Escriba su pregunta",
    ask: "Preguntar",
    thinking: "Buscando una respuesta…",
    stepsLabel: "Paso a paso",
    limit: "Ese es el límite de preguntas para este mensaje. Para más ayuda, vea Ayuda o hable con alguien de confianza.",
    error: "No pudimos responder ahora. Inténtelo de nuevo.",
    you: "Usted preguntó",
  },
  form: {
    paste: "Pegar mensaje",
    clear: "Borrar",
    pasteFailed: "No se pudo pegar. Mantenga presionado el recuadro y toque Pegar.",
    imageDrop: "También puede pegar una imagen o arrastrarla aquí.",
    cancel: "Cancelar",
  },
  link: {
    lookalike: "Este enlace usa el nombre {brand}, pero no es el sitio web real de {brand}.",
    shortener: "Es un enlace acortado, así que no puede ver a dónde lleva en realidad.",
  },
};

const zh: FeatureStrings = {
  trusted: {
    title: "我信任的号码",
    intro: "保存您核实时会拨打的真实号码。只保存在这部手机上。",
    bankName: "您的银行",
    bankNamePh: "例如：Chase",
    bankPhone: "银行电话",
    bankHint: "在您银行卡的背面。",
    familyName: "您信任的人",
    familyNamePh: "例如：我女儿 Priya",
    familyPhone: "他们的电话",
    save: "保存",
    saved: "已保存在这部手机上。",
    clear: "删除我的号码",
    add: "添加我信任的号码",
    edit: "修改我信任的号码",
    callBank: "打给{name}",
    textFamily: "给{name}发短信说这件事",
    textBody: "你能和我一起看一条信息吗？ScamShield 显示：{verdict}",
    homeTitle: "把信任的号码放在手边",
    homeBody: "保存银行的真实号码和一位您信任的人。信息看起来不对时，一点就能联系。",
  },
  speech: {
    readAloud: "朗读",
    stop: "停止朗读",
    speak: "用说的",
    listening: "正在听… 点一下停止",
    privacy: "语音输入使用您手机或浏览器自带的语音服务。",
  },
  workshop: {
    navLabel: "讲座工具包",
    eyebrow: "给团体",
    title: "讲座工具包",
    intro: "在扶轮社、图书馆、老年中心或宗教场所举办 20 分钟的防诈骗讲座。无需注册，任何投影仪都能用。",
    presentTitle: "演示模式",
    presentBody: "用大字显示 8 条练习信息。大家先判断，再由您揭晓线索。",
    presentCta: "开始演示",
    handoutTitle: "可打印讲义",
    handoutBody: "每人一页：常见诈骗、警告信号，以及一张填写信任号码的卡片。",
    handoutCta: "打开讲义",
    tipsTitle: "怎么做",
    tips: [
      "先问大家：这个月谁收到过奇怪的短信或电话？",
      "逐条展示练习信息。揭晓答案前先让大家投票。",
      "发讲义，帮每个人填好信任的号码。",
      "最后检查一条在场某人真实收到的信息。",
    ],
    reveal: "显示答案",
    next: "下一条",
    prev: "上一条",
    exit: "退出",
    keys: "也可以用方向键或空格键。",
    print: "打印",
    handoutHeading: "在受骗之前识破诈骗",
    handoutCardTitle: "我信任的号码",
    handoutCardLines: ["我的银行", "我信任的人", "我的医生或药房"],
    handoutRule: "有疑问时：挂断，不要点击，打您本来就信任的号码。",
    handoutCheck: "免费检查任何信息：",
  },
  followup: {
    title: "对这条信息有疑问？",
    intro: "关于这条信息或下一步怎么做，都可以问。例如：\"如果我已经回复了怎么办？\"",
    placeholder: "输入您的问题",
    ask: "提问",
    thinking: "正在寻找答案…",
    stepsLabel: "一步一步",
    limit: "这条信息的提问次数已用完。需要更多帮助，请看\"求助\"页面，或和您信任的人谈谈。",
    error: "暂时无法回答。请再试一次。",
    you: "您的问题",
  },
  form: {
    paste: "粘贴信息",
    clear: "清除",
    pasteFailed: "无法粘贴。请在输入框内长按，然后点「粘贴」。",
    imageDrop: "也可以粘贴图片，或把图片拖到这里。",
    cancel: "取消",
  },
  link: {
    lookalike: "这个链接用了 {brand} 的名字，但不是 {brand} 的真实网站。",
    shortener: "这是短链接，您看不出它真正通往哪里。",
  },
};

const vi: FeatureStrings = {
  trusted: {
    title: "Số điện thoại tin cậy của tôi",
    intro: "Lưu các số thật mà quý vị sẽ gọi để kiểm tra. Chỉ lưu trên điện thoại này.",
    bankName: "Ngân hàng của quý vị",
    bankNamePh: "Ví dụ: Chase",
    bankPhone: "Số điện thoại ngân hàng",
    bankHint: "Có ở mặt sau thẻ ngân hàng.",
    familyName: "Người quý vị tin",
    familyNamePh: "Ví dụ: con gái tôi Priya",
    familyPhone: "Số điện thoại của họ",
    save: "Lưu",
    saved: "Đã lưu trên điện thoại này.",
    clear: "Xóa các số của tôi",
    add: "Thêm số tin cậy",
    edit: "Đổi số tin cậy",
    callBank: "Gọi {name}",
    textFamily: "Nhắn {name} về chuyện này",
    textBody: "Xem giúp tôi một tin nhắn được không? ScamShield nói: {verdict}",
    homeTitle: "Giữ sẵn số điện thoại tin cậy",
    homeBody: "Lưu số thật của ngân hàng và một người quý vị tin. Khi tin nhắn có vẻ lạ, chỉ cần một chạm.",
  },
  speech: {
    readAloud: "Đọc to",
    stop: "Ngừng đọc",
    speak: "Nói thay vì gõ",
    listening: "Đang nghe… chạm để dừng",
    privacy: "Nhập bằng giọng nói dùng dịch vụ giọng nói của điện thoại hoặc trình duyệt.",
  },
  workshop: {
    navLabel: "Bộ tài liệu hội thảo",
    eyebrow: "Cho các nhóm",
    title: "Bộ tài liệu hội thảo",
    intro: "Tổ chức buổi 20 phút về lừa đảo tại câu lạc bộ Rotary, thư viện, trung tâm người cao tuổi hoặc nơi thờ phượng. Không cần đăng ký, dùng với mọi máy chiếu.",
    presentTitle: "Chế độ trình chiếu",
    presentBody: "Hiện 8 tin nhắn luyện tập bằng chữ lớn. Mọi người đoán trước, rồi quý vị mở manh mối.",
    presentCta: "Bắt đầu trình chiếu",
    handoutTitle: "Tài liệu in",
    handoutBody: "Mỗi người một trang: các kiểu lừa đảo, dấu hiệu cảnh báo, và một thẻ để ghi số tin cậy.",
    handoutCta: "Mở tài liệu",
    tipsTitle: "Cách tổ chức",
    tips: [
      "Mở đầu bằng câu hỏi: tháng này ai nhận được tin nhắn hay cuộc gọi lạ?",
      "Lần lượt xem các tin nhắn luyện tập. Cho mọi người chọn trước khi mở đáp án.",
      "Phát tài liệu và giúp mọi người ghi số tin cậy.",
      "Kết thúc bằng việc kiểm tra một tin nhắn thật mà ai đó trong nhóm nhận được.",
    ],
    reveal: "Xem đáp án",
    next: "Tiếp",
    prev: "Quay lại",
    exit: "Thoát",
    keys: "Cũng có thể dùng phím mũi tên hoặc phím cách.",
    print: "In",
    handoutHeading: "Nhận ra lừa đảo trước khi mất tiền",
    handoutCardTitle: "Số điện thoại tin cậy của tôi",
    handoutCardLines: ["Ngân hàng của tôi", "Người tôi tin", "Bác sĩ hoặc nhà thuốc"],
    handoutRule: "Khi nghi ngờ: cúp máy, đừng bấm vào, và gọi số quý vị đã tin tưởng.",
    handoutCheck: "Kiểm tra mọi tin nhắn miễn phí:",
  },
  followup: {
    title: "Có câu hỏi về tin nhắn này?",
    intro: "Hỏi bất cứ điều gì về tin nhắn này hoặc nên làm gì tiếp. Ví dụ: \"Nếu tôi đã trả lời thì sao?\"",
    placeholder: "Nhập câu hỏi của quý vị",
    ask: "Hỏi",
    thinking: "Đang tìm câu trả lời…",
    stepsLabel: "Từng bước",
    limit: "Đã hết số câu hỏi cho tin nhắn này. Để được giúp thêm, xem trang Trợ giúp hoặc nói chuyện với người quý vị tin.",
    error: "Chưa trả lời được lúc này. Vui lòng thử lại.",
    you: "Quý vị hỏi",
  },
  form: {
    paste: "Dán tin nhắn",
    clear: "Xóa",
    pasteFailed: "Không dán được. Hãy nhấn giữ trong ô, rồi chọn Dán.",
    imageDrop: "Quý vị cũng có thể dán hình hoặc kéo hình vào đây.",
    cancel: "Hủy",
  },
  link: {
    lookalike: "Đường link này dùng tên {brand}, nhưng không phải trang web thật của {brand}.",
    shortener: "Đây là link rút gọn, nên quý vị không thấy được nó thật sự dẫn đến đâu.",
  },
};

const tl: FeatureStrings = {
  trusted: {
    title: "Mga numerong pinagkakatiwalaan ko",
    intro: "I-save ang mga tunay na numerong tatawagan mo para mag-check. Sa teleponong ito lang naka-save.",
    bankName: "Ang iyong bangko",
    bankNamePh: "Halimbawa: Chase",
    bankPhone: "Numero ng iyong bangko",
    bankHint: "Nasa likod ito ng iyong bank card.",
    familyName: "Taong pinagkakatiwalaan mo",
    familyNamePh: "Halimbawa: anak kong si Priya",
    familyPhone: "Numero nila",
    save: "I-save",
    saved: "Naka-save sa teleponong ito.",
    clear: "Burahin ang mga numero ko",
    add: "Idagdag ang mga numerong pinagkakatiwalaan ko",
    edit: "Palitan ang mga numerong pinagkakatiwalaan ko",
    callBank: "Tawagan ang {name}",
    textFamily: "I-text si {name} tungkol dito",
    textBody: "Pwede mo ba akong samahan tingnan ang isang mensahe? Sabi ng ScamShield: {verdict}",
    homeTitle: "Ihanda ang mga numerong pinagkakatiwalaan mo",
    homeBody: "I-save ang tunay na numero ng bangko mo at ng taong pinagkakatiwalaan mo. Kapag may kakaibang mensahe, isang pindot lang sila.",
  },
  speech: {
    readAloud: "Basahin nang malakas",
    stop: "Itigil ang pagbasa",
    speak: "Magsalita sa halip na mag-type",
    listening: "Nakikinig… pindutin para huminto",
    privacy: "Ginagamit ng voice typing ang sariling speech service ng telepono o browser mo.",
  },
  workshop: {
    navLabel: "Workshop kit",
    eyebrow: "Para sa mga grupo",
    title: "Workshop kit",
    intro: "Magpatakbo ng 20-minutong session tungkol sa scam sa Rotary club, aklatan, senior center o simbahan. Walang sign-up, gumagana sa kahit anong projector.",
    presentTitle: "Presenter mode",
    presentBody: "Ipakita ang 8 practice na mensahe sa malalaking letra. Magpapasya ang grupo, saka mo ipapakita ang mga palatandaan.",
    presentCta: "Simulan ang presentasyon",
    handoutTitle: "Handout na ipi-print",
    handoutBody: "Isang pahina bawat tao: ang mga karaniwang scam, mga babala, at card para isulat ang mga numerong pinagkakatiwalaan nila.",
    handoutCta: "Buksan ang handout",
    tipsTitle: "Paano ito gawin",
    tips: [
      "Magsimula sa tanong: sino ang nakatanggap ng kakaibang text o tawag ngayong buwan?",
      "Isa-isahin ang practice na mensahe. Pabotohin muna sila bago ipakita ang sagot.",
      "Ipamigay ang handout at tulungan ang lahat na isulat ang mga numerong pinagkakatiwalaan nila.",
      "Tapusin sa pag-check ng totoong mensaheng natanggap ng isa sa grupo.",
    ],
    reveal: "Ipakita ang sagot",
    next: "Susunod",
    prev: "Bumalik",
    exit: "Lumabas",
    keys: "Gumagana rin ang arrow keys o space bar.",
    print: "I-print",
    handoutHeading: "Makita ang scam bago ka mawalan",
    handoutCardTitle: "Mga numerong pinagkakatiwalaan ko",
    handoutCardLines: ["Bangko ko", "Taong pinagkakatiwalaan ko", "Doktor o botika ko"],
    handoutRule: "Kapag may duda: ibaba ang tawag, huwag mag-click, at tumawag sa numerong pinagkakatiwalaan mo na.",
    handoutCheck: "Libreng suriin ang kahit anong mensahe:",
  },
  followup: {
    title: "May tanong tungkol sa mensaheng ito?",
    intro: "Magtanong ng kahit ano tungkol sa mensaheng ito o kung ano ang susunod na gagawin. Halimbawa: \"Paano kung nakasagot na ako?\"",
    placeholder: "I-type ang tanong mo",
    ask: "Magtanong",
    thinking: "Hinahanap ang sagot…",
    stepsLabel: "Hakbang-hakbang",
    limit: "Naabot na ang limit ng tanong para sa mensaheng ito. Para sa dagdag na tulong, tingnan ang Tulong o kausapin ang taong pinagkakatiwalaan mo.",
    error: "Hindi kami makasagot ngayon. Pakisubukang muli.",
    you: "Tanong mo",
  },
  form: {
    paste: "I-paste ang mensahe",
    clear: "Burahin",
    pasteFailed: "Hindi ma-paste. Pindutin nang matagal ang kahon, saka i-tap ang Paste.",
    imageDrop: "Puwede ring mag-paste ng larawan o i-drag ito rito.",
    cancel: "Kanselahin",
  },
  link: {
    lookalike: "Ginagamit ng link na ito ang pangalang {brand}, pero hindi ito ang tunay na website ng {brand}.",
    shortener: "Pinaikling link ito, kaya hindi mo makita kung saan talaga ito papunta.",
  },
};

const hi: FeatureStrings = {
  trusted: {
    title: "मेरे भरोसेमंद नंबर",
    intro: "जाँच के लिए जिन असली नंबरों पर आप कॉल करेंगे, उन्हें सेव करें। ये सिर्फ़ इसी फ़ोन पर रहते हैं।",
    bankName: "आपका बैंक",
    bankNamePh: "उदाहरण: Chase",
    bankPhone: "बैंक का फ़ोन नंबर",
    bankHint: "यह आपके बैंक कार्ड के पीछे लिखा होता है।",
    familyName: "कोई भरोसेमंद व्यक्ति",
    familyNamePh: "उदाहरण: मेरी बेटी प्रिया",
    familyPhone: "उनका फ़ोन नंबर",
    save: "सेव करें",
    saved: "इस फ़ोन पर सेव हो गया।",
    clear: "मेरे नंबर हटाएँ",
    add: "मेरे भरोसेमंद नंबर जोड़ें",
    edit: "मेरे भरोसेमंद नंबर बदलें",
    callBank: "{name} को कॉल करें",
    textFamily: "इस बारे में {name} को मैसेज करें",
    textBody: "क्या तुम मेरे साथ एक संदेश देख सकते हो? ScamShield कहता है: {verdict}",
    homeTitle: "भरोसेमंद नंबर पास रखें",
    homeBody: "अपने बैंक का असली नंबर और किसी भरोसेमंद व्यक्ति का नंबर सेव करें। कोई संदेश गड़बड़ लगे, तो एक टैप में संपर्क करें।",
  },
  speech: {
    readAloud: "पढ़कर सुनाएँ",
    stop: "पढ़ना बंद करें",
    speak: "लिखने के बजाय बोलें",
    listening: "सुन रहे हैं… रोकने के लिए टैप करें",
    privacy: "बोलकर लिखने में आपके फ़ोन या ब्राउज़र की अपनी स्पीच सेवा इस्तेमाल होती है।",
  },
  workshop: {
    navLabel: "वर्कशॉप किट",
    eyebrow: "समूहों के लिए",
    title: "वर्कशॉप किट",
    intro: "रोटरी क्लब, लाइब्रेरी, वरिष्ठ नागरिक केंद्र या धार्मिक स्थल पर धोखाधड़ी से बचाव का 20 मिनट का सत्र चलाएँ। कोई साइन-अप नहीं, किसी भी प्रोजेक्टर पर चलता है।",
    presentTitle: "प्रेज़ेंटर मोड",
    presentBody: "8 अभ्यास संदेश बड़े अक्षरों में दिखाएँ। लोग पहले फ़ैसला करें, फिर आप सुराग दिखाएँ।",
    presentCta: "प्रेज़ेंटेशन शुरू करें",
    handoutTitle: "प्रिंट करने वाला हैंडआउट",
    handoutBody: "हर व्यक्ति के लिए एक पेज: आम धोखे, चेतावनी के संकेत, और भरोसेमंद नंबर लिखने का कार्ड।",
    handoutCta: "हैंडआउट खोलें",
    tipsTitle: "इसे कैसे चलाएँ",
    tips: [
      "शुरुआत में पूछें: इस महीने किसे अजीब मैसेज या कॉल आया?",
      "अभ्यास संदेश एक-एक करके दिखाएँ। जवाब दिखाने से पहले लोगों से राय लें।",
      "हैंडआउट बाँटें और सबको भरोसेमंद नंबर लिखने में मदद करें।",
      "अंत में समूह में किसी को आया कोई असली संदेश जाँचें।",
    ],
    reveal: "जवाब दिखाएँ",
    next: "अगला",
    prev: "पिछला",
    exit: "बाहर निकलें",
    keys: "ऐरो की या स्पेसबार भी काम करते हैं।",
    print: "प्रिंट करें",
    handoutHeading: "नुकसान से पहले धोखा पहचानें",
    handoutCardTitle: "मेरे भरोसेमंद नंबर",
    handoutCardLines: ["मेरा बैंक", "मेरा भरोसेमंद व्यक्ति", "मेरे डॉक्टर या फ़ार्मेसी"],
    handoutRule: "शक हो तो: फ़ोन काटें, क्लिक न करें, और ऐसे नंबर पर कॉल करें जिस पर पहले से भरोसा है।",
    handoutCheck: "कोई भी संदेश मुफ़्त में जाँचें:",
  },
  followup: {
    title: "इस संदेश के बारे में सवाल?",
    intro: "इस संदेश या आगे क्या करें, इसके बारे में कुछ भी पूछें। उदाहरण: \"अगर मैंने जवाब दे दिया है तो?\"",
    placeholder: "अपना सवाल लिखें",
    ask: "पूछें",
    thinking: "जवाब ढूँढा जा रहा है…",
    stepsLabel: "क़दम-दर-क़दम",
    limit: "इस संदेश के लिए सवालों की सीमा पूरी हो गई। ज़्यादा मदद के लिए \"मदद\" पेज देखें या किसी भरोसेमंद व्यक्ति से बात करें।",
    error: "अभी जवाब नहीं दे पाए। कृपया फिर कोशिश करें।",
    you: "आपने पूछा",
  },
  form: {
    paste: "संदेश पेस्ट करें",
    clear: "मिटाएँ",
    pasteFailed: "पेस्ट नहीं हो सका। बॉक्स में दबाकर रखें, फिर पेस्ट पर टैप करें।",
    imageDrop: "आप तस्वीर पेस्ट भी कर सकते हैं या उसे यहाँ खींचकर ला सकते हैं।",
    cancel: "रद्द करें",
  },
  link: {
    lookalike: "यह लिंक {brand} का नाम इस्तेमाल करता है, पर यह {brand} की असली वेबसाइट नहीं है।",
    shortener: "यह छोटा किया गया लिंक है, इसलिए पता नहीं चलता कि यह असल में कहाँ ले जाता है।",
  },
};

const fr: FeatureStrings = {
  trusted: {
    title: "Mes numéros de confiance",
    intro: "Enregistrez les vrais numéros que vous appelleriez pour vérifier. Ils restent uniquement sur ce téléphone.",
    bankName: "Votre banque",
    bankNamePh: "Par exemple : Chase",
    bankPhone: "Le numéro de votre banque",
    bankHint: "Il figure au dos de votre carte bancaire.",
    familyName: "Une personne de confiance",
    familyNamePh: "Par exemple : ma fille Priya",
    familyPhone: "Son numéro de téléphone",
    save: "Enregistrer",
    saved: "Enregistré sur ce téléphone.",
    clear: "Supprimer mes numéros",
    add: "Ajouter mes numéros de confiance",
    edit: "Modifier mes numéros de confiance",
    callBank: "Appeler {name}",
    textFamily: "Écrire à {name} à ce sujet",
    textBody: "Tu peux regarder un message avec moi ? ScamShield dit : {verdict}",
    homeTitle: "Gardez vos numéros de confiance à portée de main",
    homeBody: "Enregistrez le vrai numéro de votre banque et celui d'une personne de confiance. Si un message semble louche, ils sont à un geste.",
  },
  speech: {
    readAloud: "Lire à voix haute",
    stop: "Arrêter la lecture",
    speak: "Parler au lieu d'écrire",
    listening: "J'écoute… touchez pour arrêter",
    privacy: "La dictée utilise le service vocal de votre téléphone ou navigateur.",
  },
  workshop: {
    navLabel: "Kit atelier",
    eyebrow: "Pour les groupes",
    title: "Kit atelier",
    intro: "Animez une séance de 20 minutes sur les arnaques dans un club Rotary, une bibliothèque, un centre pour seniors ou un lieu de culte. Sans inscription, avec n'importe quel projecteur.",
    presentTitle: "Mode présentation",
    presentBody: "Affichez les 8 messages d'entraînement en grand. Le groupe décide, puis vous révélez les indices.",
    presentCta: "Commencer la présentation",
    handoutTitle: "Fiche à imprimer",
    handoutBody: "Une page par personne : les arnaques courantes, les signes d'alerte et une carte pour noter ses numéros de confiance.",
    handoutCta: "Ouvrir la fiche",
    tipsTitle: "Comment l'animer",
    tips: [
      "Commencez par demander : qui a reçu un SMS ou un appel étrange ce mois-ci ?",
      "Passez les messages d'entraînement. Faites voter avant de révéler chaque réponse.",
      "Distribuez la fiche et aidez chacun à noter ses numéros de confiance.",
      "Terminez en vérifiant un vrai message reçu par quelqu'un du groupe.",
    ],
    reveal: "Montrer la réponse",
    next: "Suivant",
    prev: "Retour",
    exit: "Quitter",
    keys: "Les flèches ou la barre d'espace fonctionnent aussi.",
    print: "Imprimer",
    handoutHeading: "Repérez l'arnaque avant qu'elle ne vous coûte",
    handoutCardTitle: "Mes numéros de confiance",
    handoutCardLines: ["Ma banque", "Une personne de confiance", "Mon médecin ou ma pharmacie"],
    handoutRule: "En cas de doute : raccrochez, ne cliquez pas, et appelez un numéro que vous connaissez déjà.",
    handoutCheck: "Vérifiez n'importe quel message gratuitement :",
  },
  followup: {
    title: "Des questions sur ce message ?",
    intro: "Posez n'importe quelle question sur ce message ou sur la suite. Par exemple : « Et si j'ai déjà répondu ? »",
    placeholder: "Tapez votre question",
    ask: "Demander",
    thinking: "Recherche d'une réponse…",
    stepsLabel: "Étape par étape",
    limit: "C'est la limite de questions pour ce message. Pour plus d'aide, voyez la page Aide ou parlez à une personne de confiance.",
    error: "Impossible de répondre pour le moment. Veuillez réessayer.",
    you: "Votre question",
  },
  form: {
    paste: "Coller le message",
    clear: "Effacer",
    pasteFailed: "Impossible de coller. Appuyez longuement dans la case, puis touchez Coller.",
    imageDrop: "Vous pouvez aussi coller une image ou la glisser ici.",
    cancel: "Annuler",
  },
  link: {
    lookalike: "Ce lien utilise le nom {brand}, mais ce n'est pas le vrai site de {brand}.",
    shortener: "C'est un lien raccourci : impossible de voir où il mène vraiment.",
  },
};

export const FEATURES: Record<Language, FeatureStrings> = { en, es, zh, vi, tl, hi, fr };
