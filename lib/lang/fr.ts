import type { Guides } from "../content/learn";
import type { PracticeRaw } from "../content/practice";
import type { SiteStrings } from "../content/site";
import type { Strings } from "../i18n";

/** French: interface, Learn guides and Practice messages. */
export const strings: Strings = {
  languageLabel: "Langue",
  homeTitle: "Vérifier un message",
  homeIntro: "Un doute sur un SMS, un e-mail, une lettre ou un appel ? Vérifiez-le ici avant de répondre, de cliquer ou de payer.",
  tabs: { text: "Coller le texte", image: "Ajouter une capture", call: "Décrire un appel" },
  textLabel: "Le message",
  textPlaceholder: "Collez ou tapez le message ici",
  callLabel: "Ce qui s'est passé pendant l'appel",
  callPlaceholder: "Qui ont-ils dit être ? Que vous ont-ils demandé de faire ?",
  imageChoose: "Choisir une capture d'écran ou une photo",
  imageChange: "Choisir une autre image",
  imageHint: "Une capture d'écran d'un SMS ou d'un e-mail, ou la photo d'une lettre.",
  imageAlt: "L'image que vous avez choisie",
  checkButton: "Vérifier ce message",
  privacy: "Nous n'enregistrons pas vos messages.",
  checking: "Lecture de votre message…",
  errors: {
    empty: "Collez ou tapez d'abord le message.",
    tooLong: "C'est trop long. Collez seulement le message, jusqu'à 5 000 caractères.",
    imageMissing: "Choisissez d'abord une capture d'écran ou une photo.",
    imageBad: "Impossible d'ouvrir cette image. Essayez une autre capture ou photo.",
    unreadable: "Nous n'avons pas pu lire de message sur cette image. Essayez une photo plus nette, ou collez le texte.",
    busy: "Trop de personnes vérifient en ce moment. Réessayez dans quelques minutes.",
    failed: "Un problème est survenu de notre côté. Veuillez réessayer.",
    offline: "Connexion impossible. Vérifiez votre accès à Internet et réessayez.",
  },
  verdicts: {
    likely_scam: { title: "Très probablement une arnaque", sub: "Ne répondez pas, ne cliquez pas, ne payez pas." },
    careful: { title: "Prudence", sub: "Vérifiez autrement avant d'agir." },
    no_signs: {
      title: "Aucun signe d'alerte courant",
      sub: "S'il demande de l'argent ou des informations, vérifiez quand même avec le numéro officiel.",
    },
  },
  summaryLabel: "Ce qu'il veut que vous fassiez :",
  messageHeading: "Le message",
  signsHeading: "Signes d'alerte trouvés",
  noSignsNote: "Nous n'avons trouvé aucun des signes d'alerte habituels. Les arnaques évoluent sans cesse, alors restez prudent.",
  signs: {
    urgency: { label: "On vous presse", tip: "Les escrocs vous pressent pour que vous ne preniez pas le temps de réfléchir." },
    threat: { label: "Menaces ou peur", tip: "Les vraies administrations ne menacent pas d'arrestation ou d'amende par SMS, e-mail ou téléphone." },
    unusual_payment: {
      label: "Moyen de paiement étrange",
      tip: "Des frais inattendus ou des paiements en cartes cadeaux, cryptomonnaie ou virement sont des ruses courantes.",
    },
    secrets: { label: "Demande d'informations privées", tip: "Une vraie banque ne demande jamais votre code PIN, votre mot de passe ou vos codes." },
    suspicious_link: { label: "Lien suspect", tip: "Le lien ne mène pas au vrai site de l'entreprise." },
    impersonation: { label: "Se fait passer pour quelqu'un de confiance", tip: "Contactez-les vous-même avec un numéro que vous connaissez déjà." },
    too_good: { label: "Trop beau pour être vrai", tip: "On ne gagne pas un concours auquel on n'a pas participé." },
    secrecy: { label: "Vous demande de garder le secret", tip: "Les escrocs veulent vous isoler. Parlez-en à quelqu'un de confiance." },
    remote_access: { label: "Veut prendre le contrôle de votre appareil", tip: "Ne laissez jamais un inconnu contrôler votre ordinateur ou votre téléphone." },
    mismatch: { label: "Quelque chose ne colle pas", tip: "L'expéditeur annoncé n'est pas celui qui a vraiment envoyé le message." },
    unexpected_contact: { label: "Un inconnu vous contacte", tip: "Les messages amicaux d'inconnus peuvent finir en demandes d'argent." },
  },
  stepsHeading: "Que faire maintenant",
  steps: {
    likely_scam: [
      "Ne répondez pas, ne cliquez sur aucun lien et n'appelez aucun numéro du message.",
      "Ne payez pas, et n'envoyez ni cartes cadeaux, ni codes, ni informations personnelles.",
      "Bloquez l'expéditeur et supprimez le message.",
    ],
    careful: ["Ne cliquez pas encore sur les liens et n'appelez pas les numéros du message.", "Demandez à un proche de le regarder avec vous."],
    no_signs: ["Ne donnez jamais un mot de passe, un code PIN ou un code à quelqu'un qui vous contacte."],
  },
  trustedStep:
    "Contactez l'organisme avec un numéro ou un site que vous connaissez déjà, comme celui au dos de votre carte, sur votre facture ou sur son site officiel. Pas celui de ce message.",
  shareButton: "Partager avec la famille",
  shared: "Copié. Vous pouvez le coller dans un SMS ou un e-mail.",
  shareIntro: "J'ai vérifié un message avec ScamShield.",
  shareSigns: "Signes d'alerte :",
  shareCheckedWith: "Vérifiez-en un vous aussi :",
  clickedButton: "J'ai déjà cliqué, répondu ou payé",
  againButton: "Vérifier un autre message",
  backButton: "Retour",
  helpTitle: "Vous avez déjà cliqué, répondu ou payé ?",
  helpIntro: "Pas de panique, et pas de honte. Les escrocs trompent des gens prudents chaque jour. Agir vite aide.",
  helpQuestion: "Que s'est-il passé ?",
  helpTopics: {
    clicked: {
      label: "J'ai cliqué sur un lien ou répondu",
      steps: [
        "Fermez la page. N'y tapez rien.",
        "Ne répondez plus. Bloquez l'expéditeur.",
        "Si vous avez tapé un mot de passe, un numéro de carte ou d'autres informations, choisissez aussi cette option ci-dessous.",
      ],
    },
    malware: {
      label: "J'ai téléchargé un fichier ou une application qu'ils m'ont envoyé",
      steps: [
        "Ne l'ouvrez plus. Supprimez le fichier ou désinstallez l'application.",
        "Coupez le Wi-Fi, puis lancez l'analyse de sécurité de votre appareil (Sécurité Windows sur un ordinateur ; mettez votre téléphone à jour).",
        "Depuis un autre appareil, changez les mots de passe de votre messagerie et de votre banque.",
        "Faites vérifier l'appareil par une personne de confiance ou un réparateur.",
      ],
    },
    password: {
      label: "J'ai donné un mot de passe ou un code",
      steps: [
        "Changez ce mot de passe maintenant, dans la vraie application ou le vrai site, pas avec le lien reçu.",
        "Si vous utilisez le même mot de passe ailleurs, changez-le là aussi.",
        "Activez la validation en deux étapes si le compte le propose.",
      ],
    },
    card: {
      label: "J'ai donné mes informations de carte ou de banque",
      steps: [
        "Appelez votre banque maintenant, au numéro au dos de votre carte.",
        "Demandez-lui de bloquer la carte et d'en envoyer une nouvelle.",
        "Vérifiez vos relevés pour repérer des achats inconnus.",
      ],
    },
    money: {
      label: "J'ai envoyé de l'argent (banque, virement, Zelle, Cash App)",
      steps: [
        "Appelez tout de suite votre banque ou l'application de paiement. Demandez d'arrêter ou d'annuler le paiement.",
        "Pour un virement bancaire, demandez un rappel de virement (\"wire recall\").",
        "N'envoyez plus d'argent, même s'ils promettent de vous rembourser.",
      ],
    },
    giftcard: {
      label: "J'ai payé avec des cartes cadeaux",
      steps: [
        "Appelez maintenant l'émetteur de la carte, au numéro au dos. Dites que c'était une arnaque.",
        "Gardez les cartes et les reçus.",
        "N'achetez plus de cartes, quoi qu'ils disent.",
      ],
    },
    crypto: {
      label: "J'ai envoyé de la cryptomonnaie ou utilisé un distributeur Bitcoin",
      steps: [
        "Contactez tout de suite la plateforme ou la société du distributeur Bitcoin, au numéro sur la machine ou le reçu.",
        "Gardez le reçu, l'adresse du portefeuille et l'identifiant de transaction.",
        "Signalez-le au FBI sur ic3.gov et sur ReportFraud.ftc.gov.",
        "Méfiez-vous de quiconque propose de \"récupérer\" votre argent contre des frais. C'est une deuxième arnaque.",
      ],
    },
    check: {
      label: "J'ai déposé un chèque envoyé par un inconnu",
      steps: [
        "Ne dépensez pas l'argent et ne renvoyez rien, même s'ils disent que c'était une erreur.",
        "Prévenez maintenant votre banque que le chèque vous semble faux. Un chèque peut être rejeté des jours ou des semaines plus tard.",
        "Arrêtez de parler à la personne qui l'a envoyé.",
      ],
    },
    meetup: {
      label: "Quelqu'un vient me voir, ou je l'ai rencontré en personne",
      steps: [
        "Si quelqu'un vient chercher de l'argent liquide, de l'or, des cartes ou un colis, ne remettez rien. Les vraies banques, la police et l'administration n'envoient jamais de coursier.",
        "Si vous ne vous sentez pas en sécurité, appelez le 911. Sinon, appelez la police locale et prévenez qu'un coursier arrive.",
        "Si vous avez déjà remis quelque chose, notez son apparence, sa voiture et l'heure, et appelez la police tout de suite.",
        "Ne rencontrez jamais seul une personne connue en ligne. Choisissez un lieu public fréquenté et prévenez quelqu'un.",
      ],
    },
    ssn: {
      label: "J'ai donné mon numéro de sécurité sociale ou une photo de ma pièce d'identité",
      steps: [
        "Allez sur IdentityTheft.gov pour un plan de récupération étape par étape.",
        "Gelez gratuitement votre crédit auprès d'Equifax, Experian et TransUnion.",
        "Surveillez votre courrier et vos comptes bancaires.",
      ],
    },
    access: {
      label: "Je les ai laissés accéder à mon ordinateur ou téléphone",
      steps: [
        "Coupez le Wi-Fi ou débranchez Internet maintenant.",
        "Supprimez toute application qu'ils vous ont fait installer.",
        "Depuis un autre appareil, changez les mots de passe de votre messagerie et de votre banque.",
        "Faites vérifier l'appareil par une personne de confiance ou un réparateur.",
      ],
    },
    threats: {
      label: "On me menace ou on me fait chanter",
      steps: [
        "Arrêtez de répondre et ne payez pas. Payer entraîne souvent d'autres exigences.",
        "Gardez les messages en captures d'écran, puis bloquez l'expéditeur.",
        "Si vous êtes en danger, appelez le 911. Signalez les menaces en ligne sur ic3.gov.",
        "Parlez à quelqu'un de confiance. Être ciblé n'est pas de votre faute.",
      ],
    },
  },
  reportHeading: "Le signaler",
  reportSteps: [
    "Prévenez votre banque si de l'argent ou une carte est en jeu.",
    "Signalez-le à la FTC sur ReportFraud.ftc.gov.",
    "Si vous avez perdu de l'argent, signalez-le aussi à la police locale.",
    "Ligne d'aide gratuite : AARP Fraud Watch, 877-908-3360.",
    "Parlez-en à quelqu'un de confiance. Vous n'êtes pas seul.",
  ],
  helpOpenAnother: "Choisir autre chose",
  footer: "ScamShield n'enregistre pas ce que vous vérifiez.",
};

export const site: SiteStrings = {
  nav: { check: "Vérifier", learn: "Apprendre", practice: "S'entraîner", help: "Aide", about: "À propos" },
  home: {
    eyebrow: "Gratuit · Sans inscription · Rien n'est enregistré",
    heroBefore: "Vérifiez un message avant de ",
    heroEmph: "répondre, cliquer ou payer",
    heroAfter: ".",
    helpTitle: "Vous avez déjà cliqué, répondu ou payé ?",
    helpBody: "Pas de panique. Agir vite aide, et nous vous montrons exactement quoi faire.",
    helpCta: "Obtenir de l'aide",
  },
  checkingSteps: ["Lecture de votre message…", "Recherche des signes d'alerte…", "Préparation de vos prochaines étapes…"],
  scale: { no_signs: "Aucun signe courant", careful: "Prudence", likely_scam: "Arnaque probable" },
  learn: {
    eyebrow: "Apprendre",
    title: "Connaître les arnaques courantes",
    intro: "Les escrocs changent d'histoire, mais leurs ruses restent les mêmes. Voici celles que nous voyons le plus.",
    exampleLabel: "À quoi ça ressemble",
    howLabel: "Comment ça marche",
    signsLabel: "Signes d'alerte",
    todoLabel: "Que faire",
    checkCta: "Vous en avez reçu un ? Vérifiez-le",
    practiceCta: "S'entraîner à repérer les arnaques",
    allTypes: "Tous les types d'arnaque",
    next: "Suivant",
  },
  practice: {
    eyebrow: "S'entraîner",
    title: "Saurez-vous repérer l'arnaque ?",
    intro: "Nous allons vous montrer 8 messages. Certains sont des arnaques, d'autres sont vrais. Décidez pour chacun, puis voyez les indices.",
    start: "Commencer",
    progress: "Message {n} sur {total}",
    fromLabel: "De",
    scamButton: "Ça ressemble à une arnaque",
    realButton: "Ça semble vrai",
    correct: "Bien vu !",
    wrong: "Pas tout à fait.",
    answerScam: "Celui-ci est une arnaque.",
    answerReal: "Celui-ci semble vrai.",
    cluesLabel: "Les indices",
    next: "Message suivant",
    finish: "Voir mon score",
    scoreTitle: "Vous en avez repéré {n} sur {total}",
    scoreHigh: "Très bon œil. Partagez cet entraînement avec un proche pour qu'il l'essaie aussi.",
    scoreLow: "Les arnaques sont faites pour tromper. Chaque partie rend la prochaine vraie arnaque plus facile à repérer.",
    again: "Recommencer",
    checkReal: "Vérifier un vrai message",
  },
  about: {
    eyebrow: "À propos",
    title: "Comment fonctionne ScamShield",
    intro: "ScamShield est un outil gratuit qui aide à vérifier un message suspect avant d'agir.",
    sections: [
      {
        title: "Ce qu'il vérifie",
        body: [
          "Il lit le message, une capture ou votre description d'un appel, et cherche 11 signes d'alerte courants : pression, menaces, moyens de paiement étranges, demandes de codes.",
          "Chaque signe renvoie aux mots exacts de votre message, pour que vous voyiez la preuve vous-même.",
        ],
      },
      {
        title: "Comment la réponse est décidée",
        body: [
          "Un programme informatique lit le message et liste les signes d'alerte. La réponse suit des règles fixes : deux signes ou plus, ou un signe grave comme une demande de cartes cadeaux ou de code PIN, signifie « Très probablement une arnaque ».",
          "ScamShield ne dit jamais qu'un message est sûr. Il peut manquer de nouvelles ruses : dès qu'il s'agit d'argent ou d'informations personnelles, contactez l'organisme avec un numéro que vous connaissez déjà.",
        ],
      },
      {
        title: "Votre vie privée",
        body: ["Nous n'enregistrons pas vos messages et il n'y a pas de compte. Le message est vérifié puis oublié.", "Votre choix de langue est gardé uniquement sur votre appareil."],
      },
      {
        title: "Pour les associations",
        body: [
          "Clubs Rotary, bibliothèques, centres pour seniors et communautés religieuses peuvent utiliser les pages S'entraîner et Apprendre en atelier. Elles fonctionnent sur n'importe quel téléphone, en 7 langues, sans inscription.",
        ],
      },
    ],
  },
  notFound: { title: "Page introuvable", body: "Le lien est peut-être ancien ou mal saisi. Vous pouvez quand même vérifier un message ou découvrir les arnaques courantes." },
  footerAbout: "Comment fonctionne ScamShield",
  footerMade: "Conçu pour le hackathon Rotary AI for Good.",
};

export const guides: Guides = {
  delivery: {
    title: "Faux frais de livraison et de péage",
    short: "Un SMS dit qu'un colis est bloqué ou qu'un péage est impayé, et demande de petits frais.",
    example: { from: "+1 (415) 555-0187", text: "USPS : Votre colis est en attente. Payez 1,99 $ de frais de relivraison sous 24 h : usps-redeliver-help.co" },
    how: "Les frais sont faibles pour que vous n'hésitiez pas. Le lien mène à un faux site qui vole votre numéro de carte, utilisé ensuite pour de bien plus gros achats.",
    signs: ["Un lien qui n'est pas le vrai site de l'entreprise", "Un délai, comme « sous 24 h »", "Des frais que vous n'attendiez pas"],
    todo: ["Ne touchez pas le lien.", "Suivez vos colis dans l'application ou le site officiel que vous utilisez déjà.", "Supprimez le SMS et bloquez le numéro."],
  },
  bank: {
    title: "Alertes de banque et de carte",
    short: "Un message dit que votre compte est bloqué ou qu'il y a une fraude, et vous demande de confirmer vos informations.",
    example: { from: "Chase Alert", text: "Votre carte de débit est bloquée pour activité suspecte. Répondez avec votre code PIN à 4 chiffres pour la débloquer." },
    how: "Les escrocs se font passer pour le service anti-fraude de votre banque. Ils demandent votre PIN, un code à usage unique ou vos identifiants, puis vident le compte.",
    signs: ["Demande un PIN, un mot de passe ou un code", "Dit que le compte est bloqué ou va être fermé", "Demande de transférer l'argent sur un « compte sécurisé »"],
    todo: ["Ne donnez jamais un PIN ou un code. Les vraies banques ne les demandent jamais.", "Appelez le numéro au dos de votre carte.", "Si vous avez donné quelque chose, appelez votre banque tout de suite."],
  },
  government: {
    title: "Menaces de l'administration ou de l'immigration",
    short: "Quelqu'un se dit de l'IRS, de la sécurité sociale, de Medicare, de la police ou de l'immigration, et menace si vous ne payez pas.",
    example: { from: "Appel inconnu", text: "Ici l'IRS. Un mandat d'arrêt sera émis contre vous si vous ne payez pas aujourd'hui en cartes cadeaux." },
    how: "La peur fait agir vite. Les vraies administrations envoient d'abord des courriers, ne demandent jamais de cartes cadeaux, de cryptomonnaie ou de virement, et ne menacent pas d'arrestation au téléphone.",
    signs: ["Menaces d'arrestation, d'expulsion ou de perte d'aides", "Exige un paiement immédiat", "Demande des cartes cadeaux, de la cryptomonnaie ou un virement"],
    todo: ["Raccrochez. Ne rappelez pas le numéro donné.", "Cherchez vous-même le vrai numéro sur le site officiel en .gov.", "Parlez à quelqu'un de confiance avant de faire quoi que ce soit."],
  },
  family: {
    title: "Un proche en difficulté",
    short: "Un appel ou un SMS d'un « petit-enfant » ou d'un proche qui a besoin d'argent vite et demande de garder le secret.",
    example: { from: "Numéro inconnu", text: "Mamie c'est moi, je suis en prison et j'ai besoin d'aide. Envoie-moi 2 000 $ en cartes cadeaux. Ne dis rien à maman." },
    how: "Les escrocs jouent sur l'émotion et le secret. Certains imitent même la voix d'un proche grâce à l'IA. Ils demandent des cartes cadeaux, de l'argent liquide par coursier ou un virement.",
    signs: ["Une urgence et une demande d'argent", "« N'en parle à personne »", "Un nouveau numéro, ou une voix un peu bizarre"],
    todo: ["Raccrochez et rappelez votre proche à son numéro habituel.", "Posez une question dont lui seul connaît la réponse.", "Convenez à l'avance d'un mot de passe familial."],
  },
  "tech-support": {
    title: "Faux support technique",
    short: "Une fenêtre ou un appel dit que votre ordinateur a un virus et donne un numéro à appeler.",
    example: { from: "Fenêtre à l'écran", text: "ATTENTION ! Votre ordinateur est infecté. Ne fermez pas cette page. Appelez le support Microsoft au 1-844-555-0199." },
    how: "Le « technicien » vous fait installer une application comme AnyDesk pour contrôler votre appareil, puis vole vos mots de passe ou vous fait payer de fausses réparations.",
    signs: ["Une fenêtre alarmante avec un numéro de téléphone", "Demande d'installer une application ou de partager l'écran", "Demande un paiement en cartes cadeaux ou cryptomonnaie"],
    todo: ["N'appelez pas. Fermez le navigateur ou redémarrez l'ordinateur.", "Ne laissez jamais un inconnu contrôler votre appareil.", "Si vous les avez laissés entrer, coupez Internet et demandez de l'aide."],
  },
  prize: {
    title: "Prix, loteries et remboursements",
    short: "Vous avez « gagné » de l'argent ou un prix, mais il faut d'abord payer des frais ou une taxe.",
    example: { from: "Centre des prix", text: "Félicitations ! Vous avez gagné 5 000 $ à notre tirage annuel. Payez 50 $ de taxes par Western Union pour recevoir votre prix aujourd'hui." },
    how: "Un vrai prix ne demande jamais de payer pour le recevoir. Une fois payé, d'autres « frais » arrivent et le prix ne vient jamais.",
    signs: ["Un prix pour un concours auquel vous n'avez pas participé", "Des frais ou une taxe pour recevoir l'argent", "Pression pour le réclamer aujourd'hui"],
    todo: ["Ne payez rien.", "Ne donnez pas vos informations bancaires.", "Supprimez le message."],
  },
  romance: {
    title: "Arnaques sentimentales et « faux numéro »",
    short: "Un inconnu sympathique engage la conversation, gagne votre confiance pendant des semaines, puis demande de l'argent ou un investissement.",
    example: { from: "+1 (628) 555-0140", text: "Bonjour, c'est bien Sam ? Oh pardon, mauvais numéro ! Mais vous avez l'air vraiment sympa. Vous êtes d'où ?" },
    how: "L'escroc devient un « ami » ou un partenaire, souvent pendant des semaines. Ensuite il a besoin d'argent pour une urgence, ou vous invite à un « investissement » en cryptomonnaie impossible à retirer.",
    signs: ["Un inconnu qui devient très proche très vite", "Jamais de rencontre ni d'appel vidéo", "Parle d'investissements, de cryptomonnaie ou de soucis d'argent"],
    todo: ["N'envoyez jamais d'argent à quelqu'un que vous n'avez pas rencontré en personne.", "Parlez de cette relation à un proche.", "Arrêtez de répondre dès qu'il est question d'argent ou d'investir."],
  },
  job: {
    title: "Faux emplois et trop-perçus",
    short: "Un travail facile très bien payé, ou un acheteur qui paie trop « par erreur » et demande de lui rendre la différence.",
    example: { from: "Équipe RH", text: "Travail à domicile ! Gagnez 500 $ par jour en aimant des vidéos. Écrivez à notre responsable sur WhatsApp. Petit dépôt requis." },
    how: "On vous demande de payer une formation ou du matériel, ou vous recevez un chèque qui sera rejeté après que vous avez renvoyé de l'argent.",
    signs: ["Un salaire trop élevé pour un travail facile", "Il faut payer pour commencer", "Un chèque supérieur à ce qu'on vous doit"],
    todo: ["Ne payez jamais pour obtenir un emploi.", "Ne renvoyez jamais l'excédent d'un chèque ou d'un virement.", "Renseignez-vous vous-même sur l'entreprise avant de répondre."],
  },
};

export const practice: PracticeRaw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass : Vous avez un péage impayé de 6,89 $. Payez aujourd'hui pour éviter 50 $ de pénalité : ezpass-tollpay.info",
    clues: ["Le lien n'est pas le vrai site d'E-ZPass.", "Un délai et une menace de pénalité vous pressent.", "Les sociétés de péage envoient les factures par courrier à votre adresse."],
  },
  {
    from: "Pharmacie Main Street",
    text: "Votre ordonnance est prête à la Pharmacie Main Street. Répondez STOP pour ne plus recevoir de SMS.",
    clues: ["Il ne demande ni argent, ni code, ni information personnelle.", "Il n'y a aucun lien.", "C'est attendu si vous avez demandé un renouvellement."],
  },
  {
    from: "Numéro inconnu",
    text: "Papi, c'est moi. J'ai eu un accident et j'ai besoin d'argent pour la caution. Ne dis rien à maman. Tu peux acheter des cartes cadeaux ?",
    clues: ["Une urgence familiale et une demande d'argent.", "« Ne dis rien à maman » vous empêche de vérifier.", "Les cartes cadeaux sont le moyen de paiement préféré des escrocs."],
  },
  {
    from: "Votre banque",
    text: "Avez-vous tenté un achat de 86,40 $ chez Target ? Répondez OUI ou NON. Nous ne vous demanderons jamais votre code PIN ou mot de passe.",
    clues: ["Les banques envoient vraiment ce genre de vérification oui/non.", "Aucun code, aucun lien, aucun paiement demandé.", "En cas de doute, appelez le numéro au dos de votre carte."],
  },
  {
    from: "Recrutement RH",
    text: "Travail à domicile ! Gagnez 500 $ par jour en aimant des vidéos. Écrivez à notre responsable sur WhatsApp. Petit dépôt requis.",
    clues: ["Un salaire bien trop élevé pour un travail facile.", "Il faut payer un dépôt pour commencer.", "Passer sur WhatsApp évite les vérifications normales d'embauche."],
  },
  {
    from: "Services Medicare",
    text: "Votre carte Medicare va être annulée. Appelez maintenant pour confirmer votre numéro Medicare et vos coordonnées bancaires.",
    clues: ["Medicare n'appelle pas et n'envoie pas de SMS pour annuler votre carte.", "Il demande votre numéro Medicare et vos coordonnées bancaires.", "La menace de perdre vos droits sert à vous faire peur."],
  },
  {
    from: "Amazon",
    text: "Votre colis a été livré devant votre porte. Voir les détails dans l'application Amazon.",
    clues: ["Pas de lien, pas de paiement, pas de demande.", "Il vous renvoie vers l'application que vous utilisez déjà.", "C'est normal après une commande."],
  },
  {
    from: "Fenêtre à l'écran",
    text: "ATTENTION ! Votre ordinateur est infecté. Ne fermez pas cette page. Appelez le support Microsoft au 1-844-555-0199.",
    clues: ["Un vrai avertissement de virus ne donne jamais de numéro à appeler.", "« Ne fermez pas cette page » sert à vous piéger.", "Dès l'appel, ils voudront contrôler votre ordinateur."],
  },
];
