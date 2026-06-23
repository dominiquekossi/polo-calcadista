const pptxgen = require("pptxgenjs");
const { iconToBase64Png } = require("./icons.js");
const {
  FaIndustry, FaGlobeAmericas, FaHandshake, FaChartLine, FaMoneyBillWave,
  FaUsers, FaMapMarkerAlt, FaBuilding, FaAward, FaTruck, FaFlag,
  FaBalanceScale, FaUniversity, FaShoppingCart, FaSeedling, FaQuoteRight,
} = require("react-icons/fa");
const { FaShoePrints } = require("react-icons/fa6");
const { GiFactory, GiRunningShoe, GiLeatherBoot, GiBoots, GiFactoryArm, GiSewingMachine, GiReceiveMoney } = require("react-icons/gi");

// ============================== PALETTE & TYPE ==============================
const C = {
  darkBg: "1B130D", darkBg2: "241A12", leather: "7A4326", leatherDeep: "4F2A15",
  leatherLight: "9C5E37", brass: "C9912F", brassLight: "E3B561", cream: "F1E7D5",
  creamSoft: "EAE0CC", ink: "2B2018", inkSoft: "55473A", creamText: "F5ECDD",
  muted: "8A7A68", white: "FFFFFF", good: "4F6B4A", warn: "9C4B3A",
};
const FH = "Bookman Old Style"; // headers
const FB = "Calibri"; // body
const W = 13.333, H = 7.5;

function shadow(opacity = 0.16, blur = 7, offset = 2, angle = 90) {
  return { type: "outer", color: "000000", blur, offset, angle, opacity };
}

(async () => {
  // ---------------------------- ICON CACHE ----------------------------
  const want = {
    industryBrass: [FaIndustry, C.brass], industryCream: [FaIndustry, C.cream],
    globeBrass: [FaGlobeAmericas, C.brass], globeCream: [FaGlobeAmericas, C.cream],
    handshakeBrass: [FaHandshake, C.brass], handshakeCream: [FaHandshake, C.cream],
    chartBrass: [FaChartLine, C.brass], chartCream: [FaChartLine, C.cream],
    moneyBrass: [FaMoneyBillWave, C.brass], moneyCream: [FaMoneyBillWave, C.cream],
    usersBrass: [FaUsers, C.brass], usersCream: [FaUsers, C.cream],
    mapBrass: [FaMapMarkerAlt, C.brass], mapCream: [FaMapMarkerAlt, C.cream],
    buildingBrass: [FaBuilding, C.brass], buildingCream: [FaBuilding, C.cream],
    awardBrass: [FaAward, C.brass], awardCream: [FaAward, C.cream],
    truckBrass: [FaTruck, C.brass], truckCream: [FaTruck, C.cream],
    flagBrass: [FaFlag, C.brass], flagCream: [FaFlag, C.cream],
    balanceBrass: [FaBalanceScale, C.brass], balanceCream: [FaBalanceScale, C.cream],
    universityBrass: [FaUniversity, C.brass], universityCream: [FaUniversity, C.cream],
    cartBrass: [FaShoppingCart, C.brass], cartCream: [FaShoppingCart, C.cream],
    seedlingBrass: [FaSeedling, C.brass], seedlingCream: [FaSeedling, C.cream],
    quoteCream: [FaQuoteRight, C.brassLight],
    shoeprintsBrass: [FaShoePrints, C.brass], shoeprintsCream: [FaShoePrints, C.cream],
    factoryBrass: [GiFactory, C.brass], factoryCream: [GiFactory, C.cream],
    runningshoeBrass: [GiRunningShoe, C.brass], runningshoeCream: [GiRunningShoe, C.cream],
    leatherbootBrass: [GiLeatherBoot, C.brass], leatherbootCream: [GiLeatherBoot, C.cream],
    bootsBrass: [GiBoots, C.brass], bootsCream: [GiBoots, C.cream],
    factoryarmBrass: [GiFactoryArm, C.brass], factoryarmCream: [GiFactoryArm, C.cream],
    sewingBrass: [GiSewingMachine, C.brass], sewingCream: [GiSewingMachine, C.cream],
    moneyhandCream: [GiReceiveMoney, C.cream], moneyhandBrass: [GiReceiveMoney, C.brass],
  };
  const ic = {};
  for (const k in want) ic[k] = await iconToBase64Png(want[k][0], want[k][1], 256);

  // ---------------------------- DECK ----------------------------
  let pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Odorico de Moraes Eloy da Costa / IPECE";
  pres.title = "Panorama da Indústria Cearense de Calçados";

  function footer(s, num, section, dark) {
    s.addText(section.toUpperCase(), {
      x: 0.7, y: H - 0.46, w: 8, h: 0.3, fontSize: 9, fontFace: FB,
      color: C.muted, charSpacing: 1.5, margin: 0,
    });
    s.addShape(pres.shapes.OVAL, {
      x: W - 0.95, y: H - 0.5, w: 0.34, h: 0.34,
      fill: { color: dark ? C.brass : C.leather }, line: { type: "none" },
    });
    s.addText(String(num), {
      x: W - 0.95, y: H - 0.5, w: 0.34, h: 0.34, fontSize: 12, bold: true,
      fontFace: FB, color: dark ? C.darkBg : C.cream, align: "center", valign: "middle", margin: 0,
    });
  }
  function chip(s, x, y, size, iconData, bg) {
    s.addShape(pres.shapes.OVAL, { x, y, w: size, h: size, fill: { color: bg }, line: { type: "none" }, shadow: shadow(0.16, 6, 2, 90) });
    const p = size * 0.26;
    s.addImage({ data: iconData, x: x + p / 2, y: y + p / 2, w: size - p, h: size - p });
  }
  function kicker(s, text, color) {
    s.addText(text.toUpperCase(), { x: 0.7, y: 0.55, w: 10, h: 0.35, fontSize: 13, bold: true, fontFace: FB, color, charSpacing: 2, margin: 0 });
  }
  function ttl(s, text, color, size = 28, w = 11.6) {
    s.addText(text, { x: 0.7, y: 0.95, w, h: 1.05, fontSize: size, bold: true, fontFace: FH, color, margin: 0, valign: "top", lineSpacingMultiple: 1.02 });
  }
  function card(s, x, y, w, h, bg) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: bg }, shadow: shadow(0.12, 7, 2, 90) });
  }
  function bulletBlock(s, x, y, w, h, items, opts = {}) {
    const fs = opts.fontSize || 13.5, color = opts.color || C.inkSoft;
    s.addText(
      items.map((t, i) => ({ text: t, options: { bullet: { code: "25CF" }, breakLine: i < items.length - 1, color, paraSpaceAfter: opts.gap || 10 } })),
      { x, y, w, h, fontSize: fs, fontFace: FB, lineSpacingMultiple: 1.12, margin: 0 }
    );
  }

  // ============================================================
  // SLIDE 1 — CAPA
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    for (let i = 0; i < 5; i++) {
      s.addShape(pres.shapes.OVAL, {
        x: 8.6 + i * 0.85, y: -1.6 + i * 1.55, w: 6, h: 6,
        fill: { color: C.leatherDeep, transparency: 80 }, line: { type: "none" },
      });
    }
    chip(s, 0.7, 0.7, 0.85, ic.leatherbootCream, C.leather);
    s.addText("SEMINÁRIO  ·  ECONOMIA DO NORDESTE", {
      x: 0.7, y: 1.75, w: 9, h: 0.4, fontSize: 14, bold: true, fontFace: FB, color: C.brassLight, charSpacing: 3, margin: 0,
    });
    s.addText("Panorama da Indústria\nCearense de Calçados", {
      x: 0.7, y: 2.25, w: 11.6, h: 2.3, fontSize: 46, bold: true, fontFace: FH, color: C.cream, margin: 0, lineSpacingMultiple: 1.05,
    });
    s.addShape(pres.shapes.LINE, { x: 0.72, y: 4.55, w: 3.6, h: 0, line: { color: C.brass, width: 2, dashType: "lgDash" } });
    s.addText(
      "Da relocalização da cadeia produtiva nacional à consolidação do Ceará como o principal polo calçadista do Nordeste",
      { x: 0.7, y: 4.7, w: 9.8, h: 0.9, fontSize: 17, italic: true, fontFace: FB, color: C.creamSoft, margin: 0 }
    );
    s.addText(
      [
        { text: "Apresentação baseada em:  ", options: { bold: true, color: C.brassLight } },
        { text: "Odorico de Moraes Eloy da Costa \u2014 \u201CPanorama da Indústria Cearense de Calçados\u201D", options: { color: C.creamSoft } },
      ],
      { x: 0.7, y: 6.05, w: 11.2, h: 0.4, fontSize: 13, fontFace: FB, margin: 0 }
    );
    s.addText("IPECE Textos para Discussão nº 101 · agosto de 2012", {
      x: 0.7, y: 6.45, w: 11, h: 0.35, fontSize: 12, fontFace: FB, color: C.muted, margin: 0,
    });
    s.addNotes(
      "Abertura. Agradecer e situar o tema: o artigo do IPECE explica como a indústria de calçados migrou para o Nordeste e por que o Ceará se tornou o principal destino. Dizer que a apresentação segue a lógica do texto: do panorama mundial até os municípios cearenses."
    );
  }

  // ============================================================
  // SLIDE 2 — ROTEIRO
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "Roteiro da apresentação", C.leather);
    ttl(s, "Do cenário global ao chão de fábrica cearense", C.ink);
    const items = [
      ["01", "Contexto mundial", "Reestruturação da indústria de calçados e cadeia produtiva global", ic.globeCream, C.brass],
      ["02", "O Brasil no jogo", "Posição do país no ranking mundial e nas exportações", ic.flagCream, C.brass],
      ["03", "A grande migração", "Relocalização do Sul/Sudeste em direção ao Nordeste (2000-2010)", ic.truckCream, C.leather],
      ["04", "O caso Ceará", "Incentivos fiscais, salários e a aposta no calçado de plástico", ic.factoryCream, C.leather],
      ["05", "Resultados no território", "Emprego, empresas e exportações cearenses", ic.chartCream, C.brass],
      ["06", "Conclusões", "O que esse caso ensina sobre política industrial regional", ic.awardCream, C.leather],
    ];
    const cols = 2, gx = 0.45, gy = 0.32, cw = (11.95 - gx) / cols, ch = (5.0 - gy * 2) / 3;
    items.forEach((it, idx) => {
      const col = idx % cols, row = Math.floor(idx / cols);
      const x = 0.7 + col * (cw + gx), y = 2.05 + row * (ch + gy);
      card(s, x, y, cw, ch, C.white);
      chip(s, x + 0.25, y + ch / 2 - 0.32, 0.64, it[3], it[4]);
      s.addText(it[0], { x: x + cw - 0.95, y: y + 0.1, w: 0.8, h: 0.5, fontSize: 22, bold: true, fontFace: FH, color: C.creamSoft, align: "right", margin: 0 });
      s.addText(it[1], { x: x + 1.05, y: y + 0.14, w: cw - 1.25, h: 0.34, fontSize: 15, bold: true, fontFace: FB, color: C.ink, margin: 0 });
      s.addText(it[2], { x: x + 1.05, y: y + 0.48, w: cw - 1.25, h: ch - 0.58, fontSize: 11, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.1 });
    });
    footer(s, 2, "Roteiro", false);
    s.addNotes("Mostrar os 6 blocos da apresentação. Explicar que a lógica é a do próprio artigo: começa no mundo, desce para o Brasil, depois para a Região Nordeste e termina no Ceará e seus municípios.");
  }

  // ============================================================
  // SLIDE 3 — Introdução: reestruturação mundial
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "1. Contexto mundial", C.leather);
    ttl(s, "Uma indústria tradicional em reestruturação", C.ink);

    card(s, 0.7, 2.0, 5.5, 4.55, C.leather);
    chip(s, 1.0, 2.3, 0.7, ic.factoryarmCream, C.leatherDeep);
    s.addText("Desde os anos 1980", { x: 1.9, y: 2.32, w: 4.1, h: 0.66, fontSize: 16, bold: true, fontFace: FB, color: C.cream, valign: "middle", margin: 0 });
    s.addText(
      "Novas máquinas, microeletrônica e o sistema CAD/CAM (1963) entram no desenvolvimento do produto e na modelagem técnica, em busca de mais automação e competitividade.",
      { x: 1.0, y: 3.15, w: 4.9, h: 1.5, fontSize: 13, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15 }
    );
    s.addShape(pres.shapes.LINE, { x: 1.0, y: 4.75, w: 4.9, h: 0, line: { color: C.leatherLight, width: 1 } });
    s.addText(
      "Mas a costura e a montagem do cabedal seguem intensivas em mão de obra, sobretudo no calçado de couro. A automação avança mais nos injetados de plástico.",
      { x: 1.0, y: 4.9, w: 4.9, h: 1.5, fontSize: 13, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15 }
    );

    card(s, 6.45, 2.0, 6.2, 4.55, C.white);
    chip(s, 6.75, 2.3, 0.7, ic.runningshoeCream, C.brass);
    s.addText("A resposta: diversificar a produção", { x: 7.65, y: 2.32, w: 4.8, h: 0.66, fontSize: 16, bold: true, fontFace: FB, color: C.ink, valign: "middle", margin: 0 });
    bulletBlock(s, 6.75, 3.2, 5.6, 3.2, [
      "Confeccionar parte ou todo o cabedal em países de baixo custo de produção, principalmente mão de obra",
      "Descentralização das operações: a matriz retém apenas as funções corporativas superiores",
      "O valor gerado na produção e na comercialização se concentra em quem coordena a cadeia",
      "Empresas líderes passam a atuar como coordenadoras (\u201Cgovernadoras\u201D) da cadeia de suprimentos",
    ]);
    footer(s, 3, "Contexto mundial", false);
    s.addNotes(
      "Calçado é setor tradicional e intensivo em mão de obra. Mesmo com tecnologia (CAD/CAM), a montagem do cabedal em couro continua manual. Por isso a produção migra atrás de mão de obra barata: nasce uma nova divisão internacional do trabalho no setor."
    );
  }

  // ============================================================
  // SLIDE 4 — Aglomerações pelo mundo
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "1. Contexto mundial", C.leather);
    ttl(s, "Calçado se faz em aglomerados, em todo o mundo", C.ink);
    s.addText(
      "A produção tende a se concentrar geograficamente: empresas, fornecedores e instituições compartilham conhecimento e infraestrutura comuns.",
      { x: 0.7, y: 1.62, w: 11.5, h: 0.5, fontSize: 13.5, italic: true, fontFace: FB, color: C.inkSoft, margin: 0 }
    );
    const clusters = [
      ["México", "Guadalajara e León", ic.mapCream, C.brass],
      ["Coreia do Sul", "Pusan \u2014 grandes empresas", ic.mapCream, C.brass],
      ["Itália", "Brenta e Marche \u2014 pequenas empresas", ic.mapCream, C.brass],
      ["Brasil \u2014 RS", "Vale dos Sinos, o \u201Csupercluster\u201D", ic.mapCream, C.leather],
      ["Brasil \u2014 SP / MG", "Franca, Jaú, Birigui e Divinópolis", ic.mapCream, C.leather],
      ["Brasil \u2014 CE", "Microrregiões de Fortaleza e Cariri", ic.mapCream, C.leather],
    ];
    const cols = 3, gx = 0.35, gy = 0.32, cw = (11.95 - gx * 2) / 3, ch = 1.55;
    clusters.forEach((c, idx) => {
      const col = idx % cols, row = Math.floor(idx / cols);
      const x = 0.7 + col * (cw + gx), y = 2.35 + row * (ch + gy);
      card(s, x, y, cw, ch, C.white);
      chip(s, x + 0.22, y + 0.22, 0.55, c[2], c[3]);
      s.addText(c[0], { x: x + 0.95, y: y + 0.16, w: cw - 1.1, h: 0.4, fontSize: 14.5, bold: true, fontFace: FB, color: C.ink, margin: 0 });
      s.addText(c[1], { x: x + 0.95, y: y + 0.58, w: cw - 1.1, h: 0.85, fontSize: 11.5, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.1 });
    });
    s.addText(
      [
        { text: "A forma de organização não é única:  ", options: { bold: true, color: C.leather } },
        { text: "predominância de pequenas empresas (Itália, Taiwan, Espanha) versus estruturas com grandes empresas (Coreia do Sul, China e Brasil).", options: { color: C.inkSoft } },
      ],
      { x: 0.7, y: 6.5, w: 11.9, h: 0.5, fontSize: 12.5, fontFace: FB, margin: 0 }
    );
    footer(s, 4, "Contexto mundial", false);
    s.addNotes("Mostrar que o calçado se organiza em clusters no mundo todo. A diferença está na escala: lugares com muitas pequenas empresas (Itália) versus poucas grandes empresas (Coreia, China, Brasil). O Ceará já aparece aqui como cluster reconhecido.");
  }

  // ============================================================
  // SLIDE 5 — Cadeia produtiva global
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    kicker(s, "1. Contexto mundial", C.brassLight);
    ttl(s, "Quem comanda a cadeia, fica com o valor", C.cream);

    const stages = [
      ["Design & P&D", ic.industryCream, "Concepção do produto e tendências de moda"],
      ["Marca & Marketing", ic.awardCream, "Construção de marca, comunicação e varejo"],
      ["Manufatura", ic.factoryCream, "Corte, costura e montagem \u2014 etapa que migra"],
      ["Logística & Venda final", ic.cartCream, "Distribuição até o consumidor"],
    ];
    const gx = 0.4, cw = (11.95 - gx * 3) / 4, y0 = 2.55, ch = 2.0;
    stages.forEach((st, i) => {
      const x = 0.7 + i * (cw + gx);
      const isManuf = i === 2;
      card(s, x, y0, cw, ch, isManuf ? C.leather : C.darkBg2);
      chip(s, x + cw / 2 - 0.35, y0 + 0.25, 0.7, st[1], isManuf ? C.brass : C.leather);
      s.addText(st[0], { x: x + 0.1, y: y0 + 1.05, w: cw - 0.2, h: 0.5, fontSize: 13.5, bold: true, fontFace: FB, color: C.cream, align: "center", margin: 0 });
      s.addText(st[2], { x: x + 0.18, y: y0 + 1.5, w: cw - 0.36, h: 0.45, fontSize: 10, fontFace: FB, color: C.creamSoft, align: "center", margin: 0, lineSpacingMultiple: 1.05 });
      if (i < 3) {
        s.addText("\u2192", { x: x + cw + 0.02, y: y0 + 0.65, w: gx - 0.04, h: 0.6, fontSize: 22, color: C.brass, align: "center", margin: 0 });
      }
    });
    s.addText(
      [
        { text: "Cadeia comandada pelo comprador (\u201Cbuyer-driven\u201D).  ", options: { bold: true, color: C.brassLight } },
        { text: "Marcas e varejistas concentram as funções superiores e se apropriam de parcela maior do valor gerado; produtores ficam, sobretudo, com a manufatura.", options: { color: C.creamSoft } },
      ],
      { x: 0.7, y: 4.95, w: 11.9, h: 0.7, fontSize: 14, fontFace: FB, margin: 0, lineSpacingMultiple: 1.2 }
    );
    s.addShape(pres.shapes.LINE, { x: 0.7, y: 5.75, w: 11.9, h: 0, line: { color: C.leatherDeep, width: 1 } });
    s.addText(
      [
        { text: "Schmitz e Knorringa (2000): ", options: { italic: true, bold: true, color: C.brassLight } },
        { text: "a presença de agentes de comércio internacional fomenta aprendizado produtivo \u2014 mais visível nos países onde a fabricação ainda é menos desenvolvida.", options: { italic: true, color: C.creamSoft } },
      ],
      { x: 0.7, y: 5.9, w: 11.9, h: 0.7, fontSize: 12.5, fontFace: FB, margin: 0, lineSpacingMultiple: 1.2 }
    );
    footer(s, 5, "Contexto mundial", true);
    s.addNotes("Conceito-chave do artigo: cadeia governada pelos grandes compradores (varejistas e marcas). Quem desenha, financia e vende a marca ganha mais do que quem fabrica. Isso explica por que a manufatura pode migrar livremente sem alterar quem controla o negócio.");
  }

  // ============================================================
  // SLIDE 6 — Raízes do calçado no Brasil (timeline)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "2. O Brasil no jogo", C.leather);
    ttl(s, "As raízes do calçado no Brasil", C.ink, 28, 9.5);
    s.addText("Do couro de arreio à primeira grande exportação", {
      x: 0.7, y: 1.66, w: 11, h: 0.45, fontSize: 14.5, italic: true, fontFace: FB, color: C.inkSoft, margin: 0,
    });

    const tl = [
      ["1824", "Imigrantes alemães chegam ao Vale dos Sinos (RS) trazendo a cultura do artesanato em couro"],
      ["1864-1870", "Guerra do Paraguai impulsiona a confecção de arreios e o surgimento de curtumes"],
      ["1888", "Nasce a primeira fábrica de calçados do Brasil, no Vale dos Sinos"],
      ["1960s", "Produção nacional atinge 80 milhões de pares/ano; surge a necessidade de exportar"],
      ["1968", "Embarque das sandálias Franciscana (Strassburguer) para os EUA: marco da exportação em larga escala"],
    ];
    const y0 = 3.55, x0 = 0.95, xEnd = 12.35;
    s.addShape(pres.shapes.LINE, { x: x0, y: y0, w: xEnd - x0, h: 0, line: { color: C.leather, width: 2.5 } });
    const n = tl.length, span = xEnd - x0;
    const boxW = 2.32, boxH = 1.95;
    tl.forEach((t, i) => {
      const cx = x0 + (span * i) / (n - 1);
      s.addShape(pres.shapes.OVAL, { x: cx - 0.11, y: y0 - 0.11, w: 0.22, h: 0.22, fill: { color: C.brass }, line: { color: C.cream, width: 2 } });
      const by = y0 + 0.32;
      let bx = cx - boxW / 2;
      if (bx < 0.6) bx = 0.6;
      if (bx + boxW > 12.75) bx = 12.75 - boxW;
      s.addShape(pres.shapes.LINE, { x: cx, y: y0, w: 0, h: by - y0, line: { color: C.leatherLight, width: 1, dashType: "dash" } });
      card(s, bx, by, boxW, boxH, C.white);
      s.addText(t[0], { x: bx + 0.15, y: by + 0.12, w: boxW - 0.3, h: 0.35, fontSize: 15, bold: true, fontFace: FH, color: C.leather, margin: 0 });
      s.addText(t[1], { x: bx + 0.15, y: by + 0.5, w: boxW - 0.3, h: boxH - 0.62, fontSize: 10.5, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.1 });
    });
    footer(s, 6, "O Brasil no jogo", false);
    s.addNotes("Breve histórico: a indústria nasce no RS com a imigração alemã, ganha força com o couro dos arreios na Guerra do Paraguai, e profissionaliza a exportação em 1968, com a sandália Franciscana indo para os EUA.");
  }

  // ============================================================
  // SLIDE 7 — Brasil no ranking mundial (2010)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    kicker(s, "2. O Brasil no jogo", C.brassLight);
    ttl(s, "Brasil em 2010: um player mundial do calçado", C.cream);

    const stats = [
      ["3º", "maior produtor mundial de calçados"],
      ["5º", "maior mercado consumidor"],
      ["6º", "maior exportador mundial"],
      ["893,9 mi", "pares produzidos no ano"],
      ["10.351", "empresas calçadistas no país"],
      ["348.691", "empregos gerados pelo setor"],
    ];
    const cols = 3, gx = 0.4, gy = 0.35, cw = (11.95 - gx * 2) / 3, ch = 1.5;
    stats.forEach((st, idx) => {
      const col = idx % cols, row = Math.floor(idx / cols);
      const x = 0.7 + col * (cw + gx), y = 2.15 + row * (ch + gy);
      card(s, x, y, cw, ch, C.darkBg2);
      s.addText(st[0], { x: x + 0.25, y: y + 0.12, w: cw - 0.5, h: 0.78, fontSize: 34, bold: true, fontFace: FH, color: C.brass, margin: 0 });
      s.addText(st[1], { x: x + 0.25, y: y + 0.95, w: cw - 0.5, h: 0.5, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.05 });
    });
    s.addText(
      [
        { text: "84% ", options: { bold: true, color: C.brass } },
        { text: "da produção atende ao mercado interno; apenas ", options: { color: C.creamSoft } },
        { text: "16% ", options: { bold: true, color: C.brass } },
        { text: "é exportado \u2014 um padrão bem diferente do modelo asiático, voltado à exportação.", options: { color: C.creamSoft } },
      ],
      { x: 0.7, y: 6.45, w: 11.9, h: 0.6, fontSize: 14, fontFace: FB, margin: 0, lineSpacingMultiple: 1.15 }
    );
    footer(s, 7, "O Brasil no jogo", true);
    s.addNotes("Esses números mostram que o Brasil é um player mundial relevante, mas vende a maior parte para o próprio mercado interno — diferente da China, que exporta a maior parte do que produz.");
  }

  // ============================================================
  // SLIDE 8 — Benchmarking internacional (radar)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "2. O Brasil no jogo", C.leather);
    ttl(s, "Como os grandes compradores avaliam cada país", C.ink, 27, 9.4);
    s.addText(
      "Notas médias (0 a 5) atribuídas por 12 grandes compradores dos EUA e da Europa, por atributo de fornecimento",
      { x: 0.7, y: 1.66, w: 11.4, h: 0.5, fontSize: 12.5, italic: true, fontFace: FB, color: C.inkSoft, margin: 0 }
    );
    const labels = ["Qualidade", "Preço", "Tempo de resposta", "Pontualidade", "Flex. pequenas encomendas", "Flex. grandes encomendas", "Design inovativo"];
    const china = [3.8, 4.7, 2.8, 4.1, 1.8, 3.6, 1.7];
    const india = [2.0, 4.1, 2.1, 2.4, 2.9, 2.8, 1.4];
    const brasil = [3.9, 2.8, 3.5, 3.6, 3.5, 3.7, 2.5];
    const italia = [3.7, 1.9, 3.4, 3.1, 4.1, 3.0, 4.8];
    s.addChart(
      pres.charts.RADAR,
      [
        { name: "China", labels, values: china },
        { name: "Índia", labels, values: india },
        { name: "Brasil", labels, values: brasil },
        { name: "Itália", labels, values: italia },
      ],
      {
        x: 0.55, y: 2.15, w: 8.0, h: 5.05,
        chartColors: [C.muted, "B3A48F", C.brass, C.leather],
        lineSize: 2.25, lineDataSymbol: "circle", lineDataSymbolSize: 5,
        showLegend: true, legendPos: "b", legendColor: C.ink, legendFontSize: 11,
        catAxisLabelColor: C.inkSoft, catAxisLabelFontSize: 9.5,
        valAxisLabelColor: C.muted, valAxisMaxVal: 5, valAxisMinVal: 0, valAxisMajorUnit: 1,
        chartArea: { fill: { color: C.cream } },
      }
    );
    card(s, 8.85, 2.15, 3.8, 5.05, C.white);
    s.addText("Leitura rápida", { x: 9.1, y: 2.35, w: 3.3, h: 0.4, fontSize: 14, bold: true, fontFace: FB, color: C.leather, margin: 0 });
    bulletBlock(s, 9.1, 2.85, 3.3, 4.1, [
      "China e Índia: preço é o atrativo central",
      "Itália: design quase nota máxima (4,8)",
      "Brasil: qualidade + flexibilidade, posição intermediária",
      "Design ainda é ponto fraco do Brasil (2,5)",
    ], { fontSize: 12, gap: 12 });
    footer(s, 8, "O Brasil no jogo", false);
    s.addNotes("Pesquisa de Schmitz e Knorringa com 12 compradores dos EUA e Europa. Cada país tem um perfil distinto: China e Índia competem em preço; a Itália compete em design; o Brasil ocupa uma posição intermediária, com qualidade e flexibilidade.");
  }

  // ============================================================
  // SLIDE 9 — Leitura do benchmarking
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "2. O Brasil no jogo", C.leather);
    ttl(s, "Cada país compete numa frente diferente", C.ink);

    const cols = [
      [C.muted, "China e Índia", ic.moneyhandBrass, "Competem por preço \u2014 a Índia tem o preço como único grande atrativo. A China soma pontualidade e flexibilidade para grandes pedidos.", "Fraquezas: pequenos pedidos e design inovativo"],
      [C.leather, "Itália", ic.awardCream, "Lidera em design (4,8) e qualidade, ditando moda no mercado internacional. Em contrapartida, tem o pior desempenho em preço entre os quatro países.", "Aposta: diferenciação, não custo"],
      [C.brass, "Brasil", ic.balanceCream, "Posição intermediária e diferenciada frente aos concorrentes asiáticos: alia qualidade a elevada flexibilidade para pequenas e grandes encomendas, com preço moderado e boa pontualidade.", "Limite: design ainda deixa a desejar"],
    ];
    const gx = 0.4, cw = (11.95 - gx * 2) / 3;
    cols.forEach((c, i) => {
      const x = 0.7 + i * (cw + gx);
      card(s, x, 2.05, cw, 4.65, C.white);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.05, w: cw, h: 0.85, rectRadius: 0.08, fill: { color: c[0] } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.55, w: cw, h: 0.35, fill: { color: c[0] }, line: { type: "none" } });
      chip(s, x + 0.28, 2.2, 0.55, c[2], C.darkBg2);
      s.addText(c[1], { x: x + 0.98, y: 2.05, w: cw - 1.1, h: 0.85, fontSize: 16, bold: true, fontFace: FB, color: C.white, valign: "middle", margin: 0 });
      s.addText(c[3], { x: x + 0.3, y: 3.15, w: cw - 0.6, h: 2.45, fontSize: 12, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.18 });
      s.addText(c[4], { x: x + 0.3, y: 5.7, w: cw - 0.6, h: 0.9, fontSize: 11.5, italic: true, bold: true, fontFace: FB, color: c[0], margin: 0, lineSpacingMultiple: 1.1 });
    });
    footer(s, 9, "O Brasil no jogo", false);
    s.addNotes("O Brasil não compete em preço com a Ásia, nem em design com a Itália. Compete em uma faixa intermediária: qualidade boa, a preço razoável, com flexibilidade para diferentes tamanhos de encomenda.");
  }

  // ============================================================
  // SLIDE 10 — Exportações brasileiras por destino (2010)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "2. O Brasil no jogo", C.leather);
    ttl(s, "Para onde vai o calçado brasileiro (2010)", C.ink, 28, 9);

    s.addChart(
      pres.charts.BAR,
      [{ name: "% do valor exportado", labels: ["EUA", "Reino Unido", "Argentina", "Itália", "França", "Paraguai"], values: [22.93, 12.04, 11.25, 6.89, 3.97, 3.10] }],
      {
        x: 0.55, y: 2.1, w: 7.4, h: 5.05, barDir: "bar",
        chartColors: [C.brass], chartColorsOpacity: 100,
        showTitle: true, title: "Participação no valor exportado (%)", titleColor: C.ink, titleFontSize: 13,
        catAxisLabelColor: C.ink, catAxisLabelFontSize: 11.5,
        valAxisHidden: true, showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 11,
        chartArea: { fill: { color: C.cream } }, valGridLine: { style: "none" }, showLegend: false,
        barGapWidthPct: 35,
      }
    );
    card(s, 8.2, 2.1, 4.45, 5.05, C.white);
    chip(s, 8.5, 2.35, 0.6, ic.cartCream, C.leather);
    s.addText("Em pares (quantidade)", { x: 9.25, y: 2.4, w: 3.2, h: 0.5, fontSize: 14, bold: true, fontFace: FB, color: C.ink, margin: 0, valign: "middle" });
    bulletBlock(s, 8.5, 3.1, 3.9, 3.7, [
      "EUA: 20,28% dos pares exportados (1º lugar também em volume)",
      "Paraguai: 10,00% \u2014 forte em quantidade, não em valor",
      "Argentina: 9,86%",
      "Espanha: 6,71%  ·  Reino Unido: 5,24%",
      "Total exportado em 2010: US$ 1,49 bilhão / 143 milhões de pares",
    ], { fontSize: 11.5, gap: 11 });
    footer(s, 10, "O Brasil no jogo", false);
    s.addNotes("Os EUA continuam o maior comprador, tanto em valor quanto em quantidade. Mas há players regionais relevantes em volume, como Paraguai e Argentina — mercados de menor valor agregado por par.");
  }

  // ============================================================
  // SLIDE 11 — Geografia da produção: estados do Brasil
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "3. A grande migração", C.leather);
    ttl(s, "Quem produz calçado no Brasil (2010)", C.ink, 28, 9);

    const labels = ["RS", "SP", "MG", "CE", "BA", "PB"];
    const empresasPct = [36.97, 29.82, 16.97, 3.39, 1.28, 1.28];
    const empregosPct = [33.95, 16.15, 8.88, 18.23, 11.28, 3.94];
    s.addChart(
      pres.charts.BAR,
      [
        { name: "% das empresas", labels, values: empresasPct },
        { name: "% dos empregos", labels, values: empregosPct },
      ],
      {
        x: 0.55, y: 2.1, w: 8.0, h: 5.0, barDir: "col", barGrouping: "clustered",
        chartColors: [C.muted, C.brass],
        catAxisLabelColor: C.ink, catAxisLabelFontSize: 12,
        valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,
        showLegend: true, legendPos: "b", legendColor: C.ink, legendFontSize: 11,
        chartArea: { fill: { color: C.cream } }, valGridLine: { color: "DDD0BA", size: 0.5 },
        showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.inkSoft, dataLabelFontSize: 8.5,
      }
    );
    card(s, 8.85, 2.1, 3.8, 5.0, C.leather);
    chip(s, 9.1, 2.32, 0.6, ic.factoryCream, C.leatherDeep);
    s.addText("O destaque cearense", { x: 9.85, y: 2.36, w: 2.7, h: 0.55, fontSize: 14.5, bold: true, fontFace: FB, color: C.cream, valign: "middle", margin: 0 });
    s.addText("181", { x: 9.1, y: 3.1, w: 3.3, h: 0.85, fontSize: 42, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("empregados por empresa em média no Ceará \u2014 a maior do país", {
      x: 9.1, y: 3.95, w: 3.3, h: 0.85, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 9.1, y: 4.95, w: 3.3, h: 0, line: { color: C.leatherLight, width: 1 } });
    s.addText(
      "Apenas 3,39% das empresas do país concentram 18,23% dos empregos: poucas empresas, mas grandes e verticalizadas.",
      { x: 9.1, y: 5.1, w: 3.3, h: 1.8, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    footer(s, 11, "A grande migração", false);
    s.addNotes("Aqui já aparece a marca registrada do Ceará: poucas empresas (3,39%) mas muito emprego (18,23%) — média de 181 empregados por empresa, a maior do país. Isso mostra empresas grandes e verticalizadas, diferente do padrão pulverizado de SP ou MG.");
  }

  // ============================================================
  // SLIDE 12 — Cadeia coureiro-calçadista por estado
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "3. A grande migração", C.leather);
    ttl(s, "Nem todo estado tem a cadeia completa", C.ink, 28, 10);

    s.addChart(
      pres.charts.BAR,
      [{ name: "% do emprego da cadeia coureiro-calçadista", labels: ["RS", "SP", "CE", "BA"], values: [32.01, 17.30, 16.69, 10.11] }],
      {
        x: 0.55, y: 2.05, w: 5.4, h: 4.0, barDir: "col",
        chartColors: [C.brass], showTitle: true, title: "Participação no emprego total da cadeia (%)",
        titleColor: C.ink, titleFontSize: 12, catAxisLabelColor: C.ink, catAxisLabelFontSize: 12,
        valAxisHidden: true, showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 11.5,
        chartArea: { fill: { color: C.cream } }, valGridLine: { style: "none" }, showLegend: false,
      }
    );
    s.addText("Juntos, RS + SP + CE + BA respondem por 76,12% do emprego em toda a cadeia.", {
      x: 0.55, y: 6.15, w: 5.4, h: 0.6, fontSize: 11.5, italic: true, fontFace: FB, color: C.inkSoft, margin: 0,
    });

    card(s, 6.4, 2.05, 6.25, 4.7, C.white);
    s.addText("Curtume + Artefatos + Fabricação de calçados", { x: 6.7, y: 2.25, w: 5.7, h: 0.4, fontSize: 13.5, bold: true, fontFace: FB, color: C.leather, margin: 0 });
    const rows = [
      ["Rio Grande do Sul", "Cadeia completa: curtumes, artefatos de couro e fabricação de calçados próximos", C.good],
      ["São Paulo", "Também concentra fornecedores de couro e artefatos perto das fábricas", C.good],
      ["Ceará e Bahia", "Emprego decorre quase só da fabricação de calçados \u2014 pouca presença de curtume ou artefatos de couro local", C.warn],
    ];
    let yy = 2.8;
    rows.forEach((r) => {
      s.addShape(pres.shapes.OVAL, { x: 6.7, y: yy + 0.06, w: 0.16, h: 0.16, fill: { color: r[2] }, line: { type: "none" } });
      s.addText(r[0], { x: 6.98, y: yy - 0.05, w: 5.4, h: 0.35, fontSize: 13, bold: true, fontFace: FB, color: C.ink, margin: 0 });
      s.addText(r[1], { x: 6.98, y: yy + 0.32, w: 5.4, h: 0.7, fontSize: 11.5, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.12 });
      yy += 1.18;
    });
    s.addText(
      "Conclusão: a indústria cearense é \u201Cmontadora\u201D \u2014 depende de insumos (couro, solados, componentes) trazidos de outras regiões ou da indústria química.",
      { x: 6.7, y: yy + 0.05, w: 5.7, h: 0.7, fontSize: 11.5, italic: true, bold: true, fontFace: FB, color: C.leather, margin: 0, lineSpacingMultiple: 1.15 }
    );
    footer(s, 12, "A grande migração", false);
    s.addNotes("Diferença estrutural importante: RS e SP têm toda a cadeia (couro, artefatos, calçados) próxima. Ceará e Bahia são quase só 'fábrica de calçado', sem fornecedores locais relevantes de couro.");
  }

  // ============================================================
  // SLIDE 13 — Vocação cearense: plástico vs couro
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "3. A grande migração", C.leather);
    ttl(s, "A vocação cearense: plástico, não couro", C.ink, 28, 9.5);

    s.addChart(
      pres.charts.DOUGHNUT,
      [{ name: "Emprego por tipo", labels: ["Calçados de couro", "Calçados de plástico", "Outros materiais"], values: [52.90, 41.02, 6.05] }],
      {
        x: 0.6, y: 2.0, w: 5.6, h: 5.0,
        chartColors: [C.leather, C.brass, C.muted],
        showTitle: true, title: "Composição do emprego calçadista no Ceará (%)", titleColor: C.ink, titleFontSize: 12.5,
        showLegend: true, legendPos: "b", legendColor: C.ink, legendFontSize: 11.5,
        showPercent: true, dataLabelColor: C.white, dataLabelFontSize: 12, holeSize: 55,
        chartArea: { fill: { color: C.cream } },
      }
    );
    card(s, 6.55, 2.0, 6.1, 5.0, C.leather);
    s.addText("47,91%", { x: 6.9, y: 2.25, w: 5.4, h: 0.85, fontSize: 38, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("de todo o emprego brasileiro em calçados de plástico está no Ceará", {
      x: 6.9, y: 3.05, w: 5.4, h: 0.6, fontSize: 13, bold: true, fontFace: FB, color: C.cream, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 6.9, y: 3.75, w: 5.4, h: 0, line: { color: C.leatherLight, width: 1 } });
    bulletBlock(s, 6.9, 3.95, 5.4, 2.9, [
      "Compare: Bahia tem 97,40% do emprego em calçados de couro; Rio Grande do Sul, 78,83%",
      "O Ceará segue caminho próprio: injetados de PVC, EVA, PU e TR",
      "Modelo mais automatizado, ligado à indústria química, e menos dependente de curtume local",
    ], { color: C.creamSoft, fontSize: 12.5, gap: 12 });
    footer(s, 13, "A grande migração", false);
    s.addNotes("Ponto central do artigo: o Ceará não é couro como o Rio Grande do Sul. É fortemente injetados/plástico — modelo mais industrial e automatizado, ligado à indústria química, e que não depende de curtume por perto. Isso explica a desconexão com a cadeia tradicional de couro vista no slide anterior.");
  }

  // ============================================================
  // SLIDE 14 — Clusters do setor no Brasil
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "3. A grande migração", C.leather);
    ttl(s, "As maiores aglomerações calçadistas do Brasil", C.ink, 27, 10.5);

    s.addChart(
      pres.charts.BAR,
      [{ name: "Número de estabelecimentos", labels: ["Franca-SP", "Divinópolis-MG", "Jaú-SP", "Birigui-SP", "Cariri-CE", "Fortaleza-CE", "Vale dos Sinos-RS"], values: [1800, 1053, 510, 400, 178, 103, 94] }],
      {
        x: 0.55, y: 2.1, w: 7.6, h: 4.95, barDir: "bar",
        chartColors: [C.brass], showTitle: true, title: "Número de estabelecimentos por microrregião (2010)",
        titleColor: C.ink, titleFontSize: 12.5, catAxisLabelColor: C.ink, catAxisLabelFontSize: 10.5,
        valAxisHidden: true, showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 10,
        chartArea: { fill: { color: C.cream } }, valGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 30,
      }
    );
    card(s, 8.45, 2.1, 4.2, 4.95, C.white);
    chip(s, 8.7, 2.3, 0.55, ic.bootsCream, C.leather);
    s.addText("Franca, Jaú, Divinópolis e Birigui concentram 72,5% da mão de obra do setor no país.", {
      x: 9.4, y: 2.32, w: 3.1, h: 0.95, fontSize: 11.5, bold: true, fontFace: FB, color: C.ink, margin: 0, lineSpacingMultiple: 1.12,
    });
    s.addShape(pres.shapes.LINE, { x: 8.7, y: 3.4, w: 3.95, h: 0, line: { color: C.creamSoft, width: 1 } });
    bulletBlock(s, 8.7, 3.6, 3.95, 3.3, [
      "Cariri (CE) já figura entre as maiores aglomerações do país em número de estabelecimentos",
      "Fortaleza (CE) também aparece entre os principais polos nacionais",
      "Vale dos Sinos perde participação relativa, mas mantém a cadeia mais completa e integrada \u2014 por isso é chamado de \u201Csupercluster\u201D (Schmitz, 1995)",
    ], { fontSize: 11.5, gap: 11 });
    footer(s, 14, "A grande migração", false);
    s.addNotes("Cariri e Fortaleza já aparecem entre os principais clusters do país. O Vale dos Sinos perde participação relativa, mas continua sendo o mais denso e integrado — daí o termo supercluster de Schmitz.");
  }

  // ============================================================
  // SLIDE 15 — O grande movimento: relocalização 2000-2010
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    kicker(s, "3. A grande migração", C.brassLight);
    ttl(s, "O Nordeste vira o novo polo do calçado brasileiro", C.cream, 27, 11);

    s.addChart(
      pres.charts.LINE,
      [
        { name: "Sudeste", labels: ["2000", "2005", "2010"], values: [46.69, 26.86, 25.71] },
        { name: "Sul", labels: ["2000", "2005", "2010"], values: [43.58, 44.90, 37.21] },
        { name: "Nordeste", labels: ["2000", "2005", "2010"], values: [6.59, 27.32, 36.02] },
      ],
      {
        x: 0.55, y: 2.1, w: 8.0, h: 5.05, lineSize: 3, lineSmooth: false, lineDataSymbol: "circle", lineDataSymbolSize: 7,
        chartColors: [C.muted, C.leatherLight, C.brass],
        showTitle: true, title: "Participação regional no emprego do setor calçadista (%)", titleColor: C.cream, titleFontSize: 12.5,
        showLegend: true, legendPos: "b", legendColor: C.cream, legendFontSize: 11.5,
        catAxisLabelColor: C.creamSoft, catAxisLabelFontSize: 12,
        valAxisLabelColor: C.muted, valGridLine: { color: C.darkBg2, size: 0.5 },
        chartArea: { fill: { color: C.darkBg } }, showValue: true, dataLabelColor: C.cream, dataLabelFontSize: 9.5, dataLabelPosition: "t",
      }
    );
    card(s, 8.85, 2.1, 3.8, 5.05, C.darkBg2);
    s.addText("+29,4 pp", { x: 9.1, y: 2.35, w: 3.3, h: 0.7, fontSize: 32, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("é o ganho de participação do Nordeste no emprego do setor entre 2000 e 2010", {
      x: 9.1, y: 3.05, w: 3.3, h: 0.85, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 9.1, y: 4.0, w: 3.3, h: 0, line: { color: C.leatherDeep, width: 1 } });
    s.addText(
      "O Sudeste teve a maior perda relativa \u2014 São Paulo foi o principal indutor desse movimento (Garcia, 2001).",
      { x: 9.1, y: 4.15, w: 3.3, h: 1.0, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    s.addText(
      "O mesmo fenômeno parece começar a ocorrer também na região Sul, cujo crescimento se inverte após 2005.",
      { x: 9.1, y: 5.35, w: 3.3, h: 1.4, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    footer(s, 15, "A grande migração", true);
    s.addNotes("O gráfico mais importante da apresentação. Em dez anos o Nordeste passa de quase nada para mais de um terço do emprego do setor. São Paulo foi o principal indutor desse movimento, segundo Garcia (2001).");
  }

  // ============================================================
  // SLIDE 16 — Por que migrar? Três blocos de fatores
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "3. A grande migração", C.leather);
    ttl(s, "Por que migrar? Três blocos de fatores (Lages, 2003)", C.ink, 26, 11.6);

    const blocks = [
      [C.muted, "Macroeconômico", ic.globeCream, [
        "Globalização e abertura comercial brasileira",
        "Crise do Mercosul: currency board argentino e perda de competitividade",
        "Avanço da concorrência chinesa e asiática no mercado interno e externo",
      ]],
      [C.leather, "Fiscal", ic.balanceCream, [
        "Lei Kandir (LC 87/96) desarticulou a cadeia couro-calçado nas regiões tradicionais",
        "Incentivos fiscais agressivos do CE e BA, via SUDENE e renúncia fiscal",
        "Obras de infraestrutura para atrair novas plantas industriais",
      ]],
      [C.brass, "Regional / estrutural", ic.usersBrass !== undefined ? ic.usersCream : ic.usersCream, [
        "Mão de obra abundante, barata e pouco qualificada para o setor",
        "Sindicatos inexistentes ou fracos nas novas localidades",
        "Proximidade geográfica com os mercados do Nafta e da União Europeia",
      ]],
    ];
    const gx = 0.4, cw = (11.95 - gx * 2) / 3;
    blocks.forEach((b, i) => {
      const x = 0.7 + i * (cw + gx);
      card(s, x, 2.15, cw, 4.65, C.white);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.15, w: cw, h: 0.95, rectRadius: 0.08, fill: { color: b[0] } });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.7, w: cw, h: 0.4, fill: { color: b[0] }, line: { type: "none" } });
      chip(s, x + 0.25, 2.32, 0.6, b[2], C.darkBg2);
      s.addText(b[1], { x: x + 1.0, y: 2.15, w: cw - 1.2, h: 0.95, fontSize: 15.5, bold: true, fontFace: FB, color: C.white, valign: "middle", margin: 0 });
      bulletBlock(s, x + 0.3, 3.3, cw - 0.6, 3.3, b[3], { fontSize: 11.3, gap: 12 });
    });
    footer(s, 16, "A grande migração", false);
    s.addNotes("Lages (2003) organiza os motivos em três blocos. Não foi só incentivo fiscal — foi um pacote completo: contexto macroeconômico, política fiscal e características regionais (mão de obra e localização).");
  }

  // ============================================================
  // SLIDE 17 — O caso Ceará: FDI/PROVIN
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "4. O caso Ceará", C.leather);
    ttl(s, "Ceará: pioneirismo e a política do FDI", C.ink);

    card(s, 0.7, 2.0, 5.5, 4.6, C.leather);
    chip(s, 1.0, 2.3, 0.7, ic.universityCream, C.leatherDeep);
    s.addText("Fundo de Desenvolvimento\nIndustrial (FDI), desde 1979", { x: 1.9, y: 2.25, w: 4.1, h: 0.85, fontSize: 15.5, bold: true, fontFace: FB, color: C.cream, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
    bulletBlock(s, 1.0, 3.3, 4.9, 3.1, [
      "Sistema de pontuação definia o percentual de benefícios e o prazo de vigência, conforme a relação custo-benefício para o Estado",
      "Calçados foi o 6º setor em investimento atraído (8,15%, 2001-2006), mas o 1º em geração de empregos (26,19%)",
      "Atraiu também empresas de médio/grande porte de fora do CE, trazendo novas tecnologias de processo",
    ], { color: C.creamSoft, fontSize: 12.5, gap: 10 });

    card(s, 6.45, 2.0, 6.2, 4.6, C.white);
    chip(s, 6.75, 2.3, 0.7, ic.quoteCream, C.brass);
    s.addText("\u201CConfiabilidade\u201D acima do subsídio", { x: 7.65, y: 2.32, w: 4.85, h: 0.66, fontSize: 16, bold: true, fontFace: FB, color: C.ink, valign: "middle", margin: 0 });
    s.addText(
      "Tendler (2000) entrevistou executivos sobre suas decisões de relocalização:",
      { x: 6.75, y: 3.15, w: 5.6, h: 0.4, fontSize: 12.5, fontFace: FB, color: C.inkSoft, margin: 0 }
    );
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.75, y: 3.6, w: 5.6, h: 2.55, rectRadius: 0.06, fill: { color: C.creamSoft } });
    s.addText(
      "\u201C...they often alluded to the degree of \u2018confiabilidade\u2019 of the state government [...] all the states offered roughly the same subsidies anyway. [...] they spoke of the confidence they had that state government would come through with its commitments.\u201d",
      { x: 6.95, y: 3.75, w: 5.2, h: 2.25, fontSize: 12, italic: true, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.2 }
    );
    footer(s, 17, "O caso Ceará", false);
    s.addNotes(
      "O Ceará é o pioneiro entre os estados nordestinos: agressiva política de atração + reforma fiscal + descentralização para municípios do interior. Achado interessante de Tendler: não foi só o incentivo (todos ofereciam parecido) — foi a confiabilidade do governo cearense em cumprir o que prometia. Isso é capital institucional, difícil de copiar."
    );
  }

  // ============================================================
  // SLIDE 18 — Salários comparados
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "4. O caso Ceará", C.leather);
    ttl(s, "O custo do trabalho: salários da indústria calçadista (2010)", C.ink, 26, 11.6);

    const labels = ["RJ", "SC", "RS", "SP", "PB", "PE", "RN", "BA", "MG", "CE"];
    const vals = [1.91, 1.82, 1.71, 1.70, 1.50, 1.49, 1.35, 1.31, 1.27, 1.27];
    s.addChart(
      pres.charts.BAR,
      [{ name: "Salários mínimos pagos em média", labels, values: vals }],
      {
        x: 0.55, y: 2.1, w: 11.9, h: 4.5, barDir: "col",
        chartColors: [C.brass],
        chartColorsOpacity: 100,
        showTitle: false,
        catAxisLabelColor: C.ink, catAxisLabelFontSize: 13,
        valAxisHidden: true, showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.ink, dataLabelFontSize: 11.5,
        chartArea: { fill: { color: C.cream } }, valGridLine: { style: "none" }, showLegend: false, barGapWidthPct: 25,
      }
    );
    s.addText(
      [
        { text: "O Ceará paga o menor salário relativo entre os grandes produtores  ", options: { bold: true, color: C.leather } },
        { text: "\u2014 cerca de 1,5 vez menor do que o salário médio do Rio Grande do Sul, o maior produtor nacional.", options: { color: C.inkSoft } },
      ],
      { x: 0.7, y: 6.75, w: 11.9, h: 0.5, fontSize: 13, fontFace: FB, margin: 0 }
    );
    footer(s, 18, "O caso Ceará", false);
    s.addNotes("O Ceará empata com Minas Gerais no menor salário relativo entre os grandes produtores. Essa é parte central da vantagem locacional, mas também levanta o debate sobre a qualidade do emprego gerado pela relocalização.");
  }

  // ============================================================
  // SLIDE 19 — A voz dos empresários (Vale dos Sinos)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "4. O caso Ceará", C.leather);
    ttl(s, "A voz de quem migrou: pesquisa com empresas do Vale dos Sinos", C.ink, 25, 11.8);
    s.addText("42 médias e grandes empresas calçadistas gaúchas \u2014 motivos \u201Cmuito importante + importante\u201D somados (Costa e Fligenspan, 1997)", {
      x: 0.7, y: 1.62, w: 11.6, h: 0.5, fontSize: 12, italic: true, fontFace: FB, color: C.inkSoft, margin: 0,
    });

    const items = [
      ["Incentivos fiscais", 41],
      ["Salários menores na região", 39],
      ["Impostos menores", 38],
      ["Melhorar a rentabilidade da empresa", 32],
      ["Concorrência com produtores asiáticos", 31],
      ["Terreno mais barato", 30],
      ["Crédito mais fácil e barato", 29],
    ];
    const x0 = 0.7, y0 = 2.35, rowH = 0.58, maxW = 8.4, maxVal = 41;
    items.forEach((it, i) => {
      const y = y0 + i * rowH;
      s.addText(it[0], { x: x0, y, w: 3.55, h: rowH - 0.08, fontSize: 12, fontFace: FB, color: C.ink, valign: "middle", margin: 0 });
      const barW = (it[1] / maxVal) * maxW;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x0 + 3.65, y: y + 0.09, w: maxW, h: rowH - 0.26, rectRadius: 0.03, fill: { color: C.creamSoft }, line: { type: "none" } });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x0 + 3.65, y: y + 0.09, w: barW, h: rowH - 0.26, rectRadius: 0.03, fill: { color: i < 2 ? C.leather : C.brass }, line: { type: "none" } });
      s.addText(String(it[1]), { x: x0 + 3.65 + maxW + 0.08, w: 0.5, y, h: rowH - 0.08, fontSize: 12, bold: true, fontFace: FB, color: C.ink, valign: "middle", margin: 0 });
    });
    footer(s, 19, "O caso Ceará", false);
    s.addNotes("Pesquisa direta com 42 empresas do Vale dos Sinos que migraram. Confirma o que já vimos: incentivo fiscal e salário mais baixo lideram, mas sempre combinados com a necessidade de competir com a concorrência asiática.");
  }

  // ============================================================
  // SLIDE 20 — Ceará lidera o Nordeste calçadista (1985-2010)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    kicker(s, "5. Resultados no território", C.brassLight);
    ttl(s, "Ceará assume a liderança calçadista do Nordeste", C.cream, 27, 11.4);

    s.addChart(
      pres.charts.LINE,
      [
        { name: "Ceará", labels: ["1985", "1990", "1995", "2000", "2005", "2010"], values: [22.07, 20.91, 43.80, 56.50, 54.26, 50.61] },
        { name: "Pernambuco", labels: ["1985", "1990", "1995", "2000", "2005", "2010"], values: [52.18, 41.84, 8.44, 4.16, 2.18, 1.59] },
      ],
      {
        x: 0.55, y: 2.1, w: 8.0, h: 5.0, lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
        chartColors: [C.brass, C.muted],
        showTitle: true, title: "% do emprego calçadista do Nordeste, por estado", titleColor: C.cream, titleFontSize: 12.5,
        showLegend: true, legendPos: "b", legendColor: C.cream, legendFontSize: 12,
        catAxisLabelColor: C.creamSoft, catAxisLabelFontSize: 11,
        valAxisLabelColor: C.muted, valGridLine: { color: C.darkBg2, size: 0.5 },
        chartArea: { fill: { color: C.darkBg } },
      }
    );
    card(s, 8.85, 2.1, 3.8, 5.0, C.darkBg2);
    s.addText("50,61%", { x: 9.1, y: 2.32, w: 3.3, h: 0.75, fontSize: 34, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("do emprego calçadista nordestino estava no Ceará em 2010 (era 22,07% em 1985)", {
      x: 9.1, y: 3.1, w: 3.3, h: 0.85, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 9.1, y: 4.0, w: 3.3, h: 0, line: { color: C.leatherDeep, width: 1 } });
    s.addText(
      "Pernambuco era o líder regional em 1985 (52,18%) e despenca para 1,59% em 2010 \u2014 uma verdadeira \u201Cguerra fiscal\u201D dentro do próprio Nordeste, vencida pelo Ceará.",
      { x: 9.1, y: 4.2, w: 3.3, h: 2.6, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    footer(s, 20, "Resultados no território", true);
    s.addNotes("O Ceará não só cresce: ele troca de lugar com Pernambuco, que era o líder regional em 1985 e despenca para quase irrelevante. Houve uma guerra fiscal regional dentro do próprio Nordeste, e o Ceará venceu.");
  }

  // ============================================================
  // SLIDE 21 — A explosão do emprego calçadista cearense
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "5. Resultados no território", C.leather);
    ttl(s, "A explosão do emprego calçadista no Ceará", C.ink, 27, 10.6);

    s.addChart(
      pres.charts.LINE,
      [{ name: "Empregos gerados", labels: ["1990", "1995", "2000", "2005", "2010"], values: [1525, 6339, 27287, 44268, 63562] }],
      {
        x: 0.55, y: 2.05, w: 7.5, h: 4.55, lineSize: 3, lineSmooth: true, lineDataSymbol: "circle", lineDataSymbolSize: 6,
        chartColors: [C.leather],
        showTitle: true, title: "Empregos na indústria calçadista cearense", titleColor: C.ink, titleFontSize: 12.5,
        catAxisLabelColor: C.ink, catAxisLabelFontSize: 12, valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,
        valGridLine: { color: "DDD0BA", size: 0.5 }, chartArea: { fill: { color: C.cream } }, showLegend: false,
        showValue: true, dataLabelColor: C.inkSoft, dataLabelFontSize: 9.5, dataLabelPosition: "t",
      }
    );
    card(s, 8.3, 2.05, 4.35, 4.55, C.leather);
    s.addText("+4.068%", { x: 8.6, y: 2.3, w: 3.8, h: 0.85, fontSize: 36, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("de crescimento no emprego entre 1990 (1.525) e 2010 (63.562)", {
      x: 8.6, y: 3.1, w: 3.8, h: 0.85, fontSize: 12.5, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 8.6, y: 4.05, w: 3.8, h: 0, line: { color: C.leatherLight, width: 1 } });
    s.addText(
      "Mas o salário relativo caiu: de 2,00 salários mínimos (1995) para 1,27 (2010) \u2014 mesmo o setor crescendo, sinal de que a estratégia competitiva continua baseada em baixo custo.",
      { x: 8.6, y: 4.2, w: 3.8, h: 2.2, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    footer(s, 21, "Resultados no território", false);
    s.addNotes("Crescimento espetacular de empregos, mas atenção: o salário relativo (em salários mínimos) cai ao longo do tempo, mesmo com o setor se expandindo. Isso é coerente com a estratégia de competir via custo de mão de obra.");
  }

  // ============================================================
  // SLIDE 22 — Geografia interna do CE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "5. Resultados no território", C.leather);
    ttl(s, "Três modelos dentro do próprio Ceará", C.ink);

    const cols = [
      [C.leather, "Sobral", ic.factoryCream, "30,3%", "do emprego estadual", "Apenas 2 empresas (a Grendene) concentram quase um terço do emprego calçadista do Estado \u2014 modelo de planta única, voltada a calçados de plástico (74,5% local)."],
      [C.brass, "Fortaleza", ic.buildingCream, "32,4%", "do emprego estadual", "Microrregião metropolitana: maior empregadora do Estado (20.599 empregos), com 105 empresas (29,9% do total) \u2014 inclui Horizonte, forte em calçados de couro."],
      [C.muted, "Cariri / Juazeiro do Norte", ic.usersCream, "50,7%", "das empresas do Estado", "178 empresas no Cariri, com Juazeiro do Norte concentrando 156 \u2014 o único arranjo produtivo calçadista do Ceará, pulverizado e especializado em materiais sintéticos."],
    ];
    const gx = 0.4, cw = (11.95 - gx * 2) / 3;
    cols.forEach((c, i) => {
      const x = 0.7 + i * (cw + gx);
      card(s, x, 2.05, cw, 4.65, C.white);
      chip(s, x + 0.3, 2.3, 0.6, c[2], c[0]);
      s.addText(c[1], { x: x + 1.05, y: 2.32, w: cw - 1.3, h: 0.55, fontSize: 16, bold: true, fontFace: FB, color: C.ink, valign: "middle", margin: 0 });
      s.addText(c[3], { x: x + 0.3, y: 3.05, w: cw - 0.6, h: 0.7, fontSize: 30, bold: true, fontFace: FH, color: c[0], margin: 0 });
      s.addText(c[4], { x: x + 0.3, y: 3.7, w: cw - 0.6, h: 0.35, fontSize: 11, fontFace: FB, color: C.muted, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: x + 0.3, y: 4.1, w: cw - 0.6, h: 0, line: { color: C.creamSoft, width: 1 } });
      s.addText(c[5], { x: x + 0.3, y: 4.25, w: cw - 0.6, h: 2.3, fontSize: 11, fontFace: FB, color: C.inkSoft, margin: 0, lineSpacingMultiple: 1.18 });
    });
    footer(s, 22, "Resultados no território", false);
    s.addNotes("Três modelos dentro do mesmo Estado: Sobral é uma fábrica gigante (Grendene); Fortaleza concentra a região metropolitana; Cariri/Juazeiro do Norte é um arranjo produtivo local, pulverizado em muitas pequenas empresas — o único do tipo no Ceará.");
  }

  // ============================================================
  // SLIDE 23 — Exportações cearenses
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.cream };
    kicker(s, "5. Resultados no território", C.leather);
    ttl(s, "De coadjuvante a protagonista da pauta exportadora", C.ink, 26, 11.4);

    s.addChart(
      pres.charts.LINE,
      [
        { name: "Calçados e partes", labels: ["1990", "2000", "2005", "2010"], values: [0.52, 14.37, 21.82, 31.78] },
        { name: "Castanha de caju", labels: ["1990", "2000", "2005", "2010"], values: [35.94, 27.77, 14.52, 14.34] },
      ],
      {
        x: 0.55, y: 2.1, w: 7.9, h: 4.9, lineSize: 3, lineDataSymbol: "circle", lineDataSymbolSize: 6,
        chartColors: [C.leather, C.muted],
        showTitle: true, title: "Participação no valor das exportações cearenses (%)", titleColor: C.ink, titleFontSize: 12.5,
        showLegend: true, legendPos: "b", legendColor: C.ink, legendFontSize: 11.5,
        catAxisLabelColor: C.ink, catAxisLabelFontSize: 12, valAxisLabelColor: C.muted, valAxisLabelFontSize: 9,
        valGridLine: { color: "DDD0BA", size: 0.5 }, chartArea: { fill: { color: C.cream } },
      }
    );
    card(s, 8.7, 2.1, 3.95, 4.9, C.leather);
    s.addText("1º", { x: 9.0, y: 2.35, w: 3.3, h: 0.85, fontSize: 40, bold: true, fontFace: FH, color: C.brass, margin: 0 });
    s.addText("lugar na pauta de exportações do Ceará em 2010 \u2014 31,78% do valor total", {
      x: 9.0, y: 3.2, w: 3.3, h: 0.8, fontSize: 12.5, bold: true, fontFace: FB, color: C.cream, margin: 0, lineSpacingMultiple: 1.15,
    });
    s.addShape(pres.shapes.LINE, { x: 9.0, y: 4.1, w: 3.3, h: 0, line: { color: C.leatherLight, width: 1 } });
    s.addText(
      "Em 1990, o calçado representava apenas 0,52% das exportações cearenses, atrás da castanha de caju, da lagosta e do couro.",
      { x: 9.0, y: 4.25, w: 3.3, h: 2.5, fontSize: 12, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.18 }
    );
    footer(s, 23, "Resultados no território", false);
    s.addNotes("Em 20 anos o calçado se torna o principal produto de exportação do Ceará, superando a castanha de caju, que era hegemônica. Isso mostra o quanto a relocalização industrial transformou a economia exportadora do Estado.");
  }

  // ============================================================
  // SLIDE 24 — Conclusões
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    for (let i = 0; i < 4; i++) {
      s.addShape(pres.shapes.OVAL, { x: 9.5 + i * 0.9, y: -1 + i * 1.9, w: 5.5, h: 5.5, fill: { color: C.leatherDeep, transparency: 82 }, line: { type: "none" } });
    }
    kicker(s, "6. Conclusões", C.brassLight);
    ttl(s, "O que esse caso ensina sobre política industrial regional", C.cream, 27, 11.6);

    const concl = [
      ["Cadeia comandada pelo comprador", "O valor concentra-se em design, marca e marketing \u2014 etapas que permaneceram nas regiões tradicionais (Sul/Sudeste)."],
      ["Relocalização parcial, não substituição", "O Nordeste herdou a manufatura mais simples; gerenciamento, design e marketing continuam nas filiais de origem (Garcia, 2001)."],
      ["Ceará: incentivo fiscal + confiabilidade + mão de obra barata", "Combinação que atraiu grandes empresas e fez do Estado o líder calçadista do Nordeste, superando até Pernambuco."],
      ["Um modelo próprio: o calçado de plástico", "Em vez de copiar o couro do Vale dos Sinos, o Ceará se especializou em injetados \u2014 caminho mais automatizado e menos dependente de cadeia local."],
      ["Transformação real da economia cearense", "O calçado passou de 0,52% (1990) a 1º lugar nas exportações do Estado (2010), com Cariri/Juazeiro do Norte revelando um arranjo produtivo local genuíno."],
    ];
    const y0 = 2.15;
    concl.forEach((c, i) => {
      const y = y0 + i * 0.93;
      s.addShape(pres.shapes.OVAL, { x: 0.7, y: y + 0.03, w: 0.4, h: 0.4, fill: { color: C.brass }, line: { type: "none" } });
      s.addText(String(i + 1), { x: 0.7, y: y + 0.03, w: 0.4, h: 0.4, fontSize: 14, bold: true, fontFace: FB, color: C.darkBg, align: "center", valign: "middle", margin: 0 });
      s.addText(c[0], { x: 1.3, y: y - 0.04, w: 4.5, h: 0.8, fontSize: 13.5, bold: true, fontFace: FB, color: C.cream, margin: 0, lineSpacingMultiple: 1.05 });
      s.addText(c[1], { x: 5.95, y: y - 0.04, w: 6.65, h: 0.85, fontSize: 11.5, fontFace: FB, color: C.creamSoft, margin: 0, lineSpacingMultiple: 1.12 });
    });
    footer(s, 24, "Conclusões", true);
    s.addNotes("Fechar amarrando tudo: o artigo mostra como uma política regional bem desenhada (FDI + confiabilidade institucional) conseguiu capturar uma etapa específica — não toda — da cadeia global de valor do calçado, e como o Ceará criou um modelo próprio baseado em plástico, não em couro.");
  }

  // ============================================================
  // SLIDE 25 — Obrigado / Perguntas
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };
    chip(s, W / 2 - 0.5, 0.9, 1.0, ic.leatherbootCream, C.leather);
    s.addText("Obrigado!", { x: 0, y: 2.15, w: W, h: 0.95, fontSize: 42, bold: true, fontFace: FH, color: C.cream, align: "center", margin: 0 });
    s.addText("Perguntas e comentários são bem-vindos", { x: 0, y: 3.05, w: W, h: 0.5, fontSize: 16, italic: true, fontFace: FB, color: C.creamSoft, align: "center", margin: 0 });

    card(s, W / 2 - 5.4, 3.95, 10.8, 2.55, C.darkBg2);
    s.addText("Principais referências citadas", { x: W / 2 - 5.1, y: 4.15, w: 6, h: 0.4, fontSize: 13.5, bold: true, fontFace: FB, color: C.brassLight, margin: 0 });
    const refs = [
      "GARCIA, R. (2001). Vantagens Competitivas de Empresas em Aglomerações Industriais. Tese, IE/UNICAMP.",
      "SCHMITZ, H.; KNORRINGA, P. (2000). Learning from Global Buyers. Journal of Development Studies, v.37, n.2.",
      "TENDLER, J. (2000). The Economic Wars Between the States. MIT/Bank of the Northeast.",
      "LAGES, A. M. G. (2003). A Relocalização Espacial da Indústria de Calçados de Couro Brasileira. Tese, UFRJ.",
      "PROCHNIK, V.; UNE, M. Y. (2006). A Migração da Cadeia Produtiva de Calçados para o Nordeste. Banco do Nordeste.",
      "COSTA, A. B.; FLIGENSPAN, F. B. (1997). Avaliação do movimento de relocalização industrial. SEBRAE-RS/NETIT-UFRGS.",
    ];
    s.addText(
      refs.map((t, i) => ({ text: t, options: { bullet: { code: "25CF" }, breakLine: i < refs.length - 1, color: C.creamSoft, paraSpaceAfter: 5 } })),
      { x: W / 2 - 5.1, y: 4.6, w: 10.2, h: 1.85, fontSize: 10.5, fontFace: FB, lineSpacingMultiple: 1.08, margin: 0 }
    );
    s.addText("IPECE Textos para Discussão nº 101 · agosto de 2012  ·  Odorico de Moraes Eloy da Costa", {
      x: 0, y: H - 0.55, w: W, h: 0.35, fontSize: 10.5, fontFace: FB, color: C.muted, align: "center", margin: 0,
    });
    s.addNotes("Agradecer e abrir para perguntas. Se perguntarem fontes específicas, usar essa lista de referências como apoio para citar os autores corretos.");
  }

  await pres.writeFile({ fileName: "/home/claude/calcados/Panorama_Industria_Cearense_Calcados.pptx" });
  console.log("PPTX criado com sucesso.");
})().catch((e) => { console.error(e); process.exit(1); });
