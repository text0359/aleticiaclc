// script.js - Lógica da Calculadora, Modais e Temas
console.log("script.js: Iniciando execução...");

// --- Lista de Mensagens Estáticas ---
const staticDailyMessages = [
    { messageText: "Leticia, meu amor, que seu dia seja tão radiante quanto seu sorriso.", bibleVerseRef: "Salmos 118:24", bibleVerseText: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele." },
    { messageText: "Para você, Leticia, todo o meu carinho e admiração. Você é luz!", bibleVerseRef: "Filipenses 4:13", bibleVerseText: "Tudo posso naquele que me fortalece." },
    { messageText: "Leticia, pensar em você torna meu dia mais feliz. Te amo!", bibleVerseRef: "1 Coríntios 13:4", bibleVerseText: "O amor é paciente, o amor é bondoso." },
    { messageText: "Que o amor de Deus nos guie e proteja sempre, meu bem. Para Leticia.", bibleVerseRef: "Provérbios 3:5-6", bibleVerseText: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas." },
    { messageText: "Leticia, você é a melodia que alegra minha vida. Tenha um dia abençoado!", bibleVerseRef: "Salmos 91:1", bibleVerseText: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará." },
    { messageText: "Com você, Leticia, cada momento é especial. Que Deus nos abençoe.", bibleVerseRef: "Jeremias 29:11", bibleVerseText: "Porque sou eu que conheço os planos que tenho para vocês', diz o Senhor, 'planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro." },
    { messageText: "Leticia, meu amor, sua presença é um presente. Que seu dia seja lindo!", bibleVerseRef: "Romanos 8:28", bibleVerseText: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito." },
    { messageText: "Para a Leticia mais incrível: que seu dia seja cheio de paz e amor.", bibleVerseRef: "Isaías 41:10", bibleVerseText: "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa." },
    { messageText: "Leticia, você ilumina meus dias. Te amo mais que palavras podem dizer.", bibleVerseRef: "Salmos 23:1", bibleVerseText: "O Senhor é o meu pastor; nada me faltará." },
    { messageText: "Que a fé nos fortaleça e o amor nos una ainda mais, Leticia.", bibleVerseRef: "1 Pedro 5:7", bibleVerseText: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês." },
    { messageText: "Leticia, cada dia ao seu lado é uma nova canção de amor.", bibleVerseRef: "Efésios 5:2", bibleVerseText: "e vivam em amor, como também Cristo nos amou e se entregou por nós como oferta e sacrifício de aroma agradável a Deus." },
    { messageText: "Meu amor, Leticia, que a esperança floresça em seu coração hoje.", bibleVerseRef: "Hebreus 11:1", bibleVerseText: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos." },
    { messageText: "Leticia, você é meu porto seguro. Que Deus te guarde.", bibleVerseRef: "Salmos 46:1", bibleVerseText: "Deus é o nosso refúgio e fortaleza, auxílio sempre presente na adversidade." },
    { messageText: "Para Leticia, com todo meu amor: que a alegria seja sua companheira hoje.", bibleVerseRef: "Neemias 8:10", bibleVerseText: "A alegria do Senhor é a vossa força." },
    { messageText: "Leticia, seu sorriso é a inspiração dos meus dias. Te amo!", bibleVerseRef: "Provérbios 17:22", bibleVerseText: "O coração alegre serve de bom remédio, mas o espírito abatido virá a secar os ossos." },
    { messageText: "Que a paz de Cristo reine em nossos corações, meu amor Leticia.", bibleVerseRef: "João 14:27", bibleVerseText: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbem os seus corações, nem tenham medo." },
    { messageText: "Leticia, você é a bênção que Deus me deu. Tenha um dia maravilhoso!", bibleVerseRef: "Tiago 1:17", bibleVerseText: "Toda boa dádiva e todo dom perfeito vêm do alto, descendo do Pai das luzes, que não muda como sombras inconstantes." },
    { messageText: "Meu amor Leticia, que a fé nos mova e o amor nos conecte sempre.", bibleVerseRef: "Marcos 9:23", bibleVerseText: "Tudo é possível àquele que crê." },
    { messageText: "Leticia, seu amor me completa. Que seu dia seja especial como você.", bibleVerseRef: "Cânticos 8:7", bibleVerseText: "Nem muitas águas conseguem apagar o amor; os rios não conseguem levá-lo na correnteza." },
    { messageText: "Para Leticia, a mulher da minha vida: que Deus ilumine seus passos.", bibleVerseRef: "Salmos 119:105", bibleVerseText: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho." },
    { messageText: "Leticia, que a graça de Deus te acompanhe em cada momento.", bibleVerseRef: "2 Coríntios 12:9", bibleVerseText: "Mas ele me disse: 'Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza'." },
    { messageText: "Meu amor Leticia, seu carinho é o meu maior tesouro.", bibleVerseRef: "Mateus 6:21", bibleVerseText: "Pois onde estiver o seu tesouro, aí também estará o seu coração." },
    { messageText: "Leticia, que a bondade do Senhor se renove em sua vida hoje.", bibleVerseRef: "Lamentações 3:22-23", bibleVerseText: "Graças ao grande amor do Senhor é que não somos consumidos, pois as suas misericórdias são inesgotáveis. Renovam-se cada manhã; grande é a sua fidelidade!" },
    { messageText: "Para Leticia, com amor eterno: que a paz esteja com você.", bibleVerseRef: "Filipenses 4:7", bibleVerseText: "E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus." },
    { messageText: "Leticia, você é a resposta das minhas orações. Te amo!", bibleVerseRef: "1 Samuel 1:27", bibleVerseText: "Era este menino que eu pedia, e o Senhor concedeu-me o pedido." },
    { messageText: "Meu bem, Leticia, que o amor seja sempre nosso guia.", bibleVerseRef: "Colossenses 3:14", bibleVerseText: "Acima de tudo, porém, revistam-se do amor, que é o elo perfeito." },
    { messageText: "Leticia, que seu dia seja repleto de pequenas alegrias e grandes bênçãos.", bibleVerseRef: "Salmos 37:4", bibleVerseText: "Deleite-se no Senhor, e ele atenderá aos desejos do seu coração." },
    { messageText: "Para a minha amada Leticia: que a luz divina brilhe sobre você.", bibleVerseRef: "Números 6:24-26", bibleVerseText: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda graça; o Senhor volte para ti o seu rosto e te dê paz." },
    { messageText: "Leticia, seu amor é a força que me impulsiona. Tenha um dia lindo!", bibleVerseRef: "Isaías 40:31", bibleVerseText: "Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam." },
    { messageText: "Meu amor, Leticia, que cada instante seja vivido com fé e gratidão.", bibleVerseRef: "1 Tessalonicenses 5:18", bibleVerseText: "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus." },
    { messageText: "Leticia, você é meu sonho realizado. Que Deus nos proteja.", bibleVerseRef: "Gênesis 2:24", bibleVerseText: "Por essa razão, o homem deixará pai e mãe e se unirá à sua mulher, e eles se tornarão uma só carne." },
    { messageText: "Para Leticia, com todo o meu coração: que a esperança seja sua âncora.", bibleVerseRef: "Romanos 15:13", bibleVerseText: "Que o Deus da esperança os encha de toda alegria e paz, por sua confiança nele, para que vocês transbordem de esperança, pelo poder do Espírito Santo." },
    { messageText: "Leticia, que a sabedoria divina guie suas decisões hoje.", bibleVerseRef: "Tiago 1:5", bibleVerseText: "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida." },
    { messageText: "Meu amor Leticia, que a presença de Deus seja sentida em cada detalhe.", bibleVerseRef: "Mateus 28:20", bibleVerseText: "E eu estarei sempre com vocês, até o fim dos tempos." },
    { messageText: "Leticia, seu sorriso tem o poder de transformar meu dia. Te amo!", bibleVerseRef: "Eclesiastes 3:1", bibleVerseText: "Para tudo há uma ocasião certa; há um tempo certo para cada propósito debaixo do céu." },
    { messageText: "Para Leticia, minha inspiração: que seu caminho seja de luz e paz.", bibleVerseRef: "Josué 1:9", bibleVerseText: "Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar." },
    { messageText: "Leticia, que o amor que nos une se fortaleça a cada amanhecer.", bibleVerseRef: "Efésios 4:2-3", bibleVerseText: "Sejam completamente humildes e dóceis, e sejam pacientes, suportando uns aos outros com amor. Façam todo o esforço para conservar a unidade do Espírito pelo vínculo da paz." },
    { messageText: "Meu bem, Leticia, que a alegria do Senhor transborde em sua vida.", bibleVerseRef: "Salmos 16:11", bibleVerseText: "Tu me farás conhecer a vereda da vida, a alegria plena da tua presença, eterno prazer à tua direita." },
    { messageText: "Leticia, você é a estrela que guia meu coração. Tenha um dia abençoado!", bibleVerseRef: "Miquéias 6:8", bibleVerseText: "Ele mostrou a você, ó mortal, o que é bom. E o que o Senhor exige de você? Praticar a justiça, amar a fidelidade e andar humildemente com o seu Deus." },
    { messageText: "Para Leticia, com todo carinho: que a fé seja seu escudo e o amor sua bandeira.", bibleVerseRef: "2 Timóteo 1:7", bibleVerseText: "Pois Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio." },
    { messageText: "Leticia, em cada batida do meu coração, há um 'eu te amo' para você.", bibleVerseRef: "Salmos 139:14", bibleVerseText: "Eu te louvo porque me fizeste de modo especial e admirável. Tuas obras são maravilhosas! Digo isso com convicção." },
    { messageText: "Meu amor Leticia, que a paz que excede todo entendimento guarde seu coração.", bibleVerseRef: "João 16:33", bibleVerseText: "Eu lhes disse essas coisas para que em mim vocês tenham paz. Neste mundo vocês terão aflições; contudo, tenham ânimo! Eu venci o mundo." },
    { messageText: "Leticia, que seu dia seja leve como uma pluma e doce como o mel.", bibleVerseRef: "Provérbios 16:24", bibleVerseText: "Palavras agradáveis são como favo de mel: doces para a alma e saúde para o corpo." },
    { messageText: "Para você, Leticia, meu amor: que a felicidade te encontre em cada esquina.", bibleVerseRef: "Salmos 30:5", bibleVerseText: "Pois a sua ira só dura um instante, mas o seu favor dura a vida toda; o choro pode persistir uma noite, mas de manhã irrompe a alegria." },
    { messageText: "Leticia, você é a poesia que Deus escreveu na minha vida.", bibleVerseRef: "Efésios 2:10", bibleVerseText: "Porque somos criação de Deus realizada em Cristo Jesus para fazermos boas obras, as quais Deus preparou antes para nós as praticarmos." },
    { messageText: "Meu amor Leticia, que a esperança seja a luz que ilumina seus sonhos.", bibleVerseRef: "Romanos 12:12", bibleVerseText: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração." },
    { messageText: "Leticia, que a força do Senhor te sustente e Sua mão te guie.", bibleVerseRef: "Deuteronômio 31:6", bibleVerseText: "Sejam fortes e corajosos. Não tenham medo nem fiquem apavorados por causa delas, pois o Senhor, o seu Deus, vai com vocês; nunca os deixará, nunca os abandonará." },
    { messageText: "Para Leticia, com amor: que seu coração transborde de gratidão e paz.", bibleVerseRef: "Colossenses 3:15", bibleVerseText: "Que a paz de Cristo seja o juiz em seus corações, visto que vocês foram chamados para viver em paz, como membros de um só corpo. E sejam agradecidos." },
    { messageText: "Leticia, cada momento ao seu lado é um presente divino. Te amo!", bibleVerseRef: "Eclesiastes 9:9", bibleVerseText: "Desfrute a vida com a mulher a quem você ama, todos os dias desta vida sem sentido que Deus dá a você debaixo do sol; todos os seus dias sem sentido! Pois essa é a sua recompensa na vida pelo seu árduo trabalho debaixo do sol." },
    { messageText: "Meu amor Leticia, que a fé seja a bússola que orienta seus passos.", bibleVerseRef: "2 Coríntios 5:7", bibleVerseText: "Porque vivemos por fé, e não pelo que vemos." },
    { messageText: "Leticia, que o amor de Deus seja o alicerce da nossa união.", bibleVerseRef: "1 João 4:16", bibleVerseText: "E assim conhecemos e cremos no amor que Deus tem por nós. Deus é amor. Todo aquele que permanece no amor permanece em Deus, e Deus nele." },
    { messageText: "Para Leticia, minha joia rara: que seu brilho ilumine o mundo.", bibleVerseRef: "Mateus 5:16", bibleVerseText: "Assim brilhe a luz de vocês diante dos homens, para que vejam as suas boas obras и glorifiquem ao Pai de vocês, que está nos céus." },
    { messageText: "Leticia, que a ternura do seu olhar continue a aquecer minha alma.", bibleVerseRef: "Cânticos 4:9", bibleVerseText: "Você roubou meu coração, minha irmã, minha noiva; roubou meu coração com um simples olhar, com uma só pérola do seu colar." },
    { messageText: "Meu amor Leticia, que a cada novo dia nosso amor se renove e floresça.", bibleVerseRef: "Rute 1:16", bibleVerseText: "Disse, porém, Rute: Não me instes para que te deixe e me obrigue a não seguir-te; porque, aonde quer que fores, irei eu e, onde quer que pousares, ali pousarei eu; o teu povo é o meu povo, o teu Deus é o meu Deus." },
    { messageText: "Leticia, que a presença do Espírito Santo traga paz e alegria ao seu dia.", bibleVerseRef: "Gálatas 5:22-23", bibleVerseText: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio. Contra essas coisas não há lei." },
    { messageText: "Para você, Leticia, meu eterno amor: que a felicidade seja constante.", bibleVerseRef: "Salmos 126:3", bibleVerseText: "Sim, grandes coisas fez o Senhor por nós, por isso estamos alegres." },
    { messageText: "Leticia, seu amor é o farol que me guia na tempestade. Te adoro!", bibleVerseRef: "Provérbios 18:22", bibleVerseText: "Quem encontra uma esposa encontra algo excelente; recebeu uma bênção do Senhor." },
    { messageText: "Meu amor Leticia, que a fé nos dê coragem para enfrentar qualquer desafio.", bibleVerseRef: "1 Coríntios 16:13", bibleVerseText: "Estejam vigilantes, mantenham-se firmes na fé, sejam corajosos, sejam fortes." },
    { messageText: "Leticia, que a doçura do seu ser continue a encantar minha vida.", bibleVerseRef: "Salmos 34:8", bibleVerseText: "Provem e vejam como o Senhor é bom. Como é feliz o homem que nele se refugia!" },
    { messageText: "Para Leticia, com todo meu afeto: que Deus realize os desejos do seu coração.", bibleVerseRef: "Marcos 11:24", bibleVerseText: "Portanto, eu lhes digo: tudo o que vocês pedirem em oração, creiam que já o receberam, e assim lhes sucederá." },
    { messageText: "Leticia, você é a canção que meu coração não cansa de cantar.", bibleVerseRef: "Salmos 40:3", bibleVerseText: "Pôs um novo cântico na minha boca, um hino de louvor ao nosso Deus. Muitos verão isso e temerão, e confiarão no Senhor." },
    { messageText: "Meu amor, Leticia, que nossa jornada juntos seja abençoada e cheia de amor.", bibleVerseRef: "Amós 3:3", bibleVerseText: "Duas pessoas andarão juntas se não estiverem de acordo?" },
    { messageText: "Leticia, que a luz da Palavra de Deus ilumine sempre nossos caminhos.", bibleVerseRef: "2 Timóteo 3:16-17", bibleVerseText: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça, para que o homem de Deus seja apto e plenamente preparado para toda boa obra." },
    { messageText: "Para Leticia, minha rainha: que seu dia seja digno de sua realeza.", bibleVerseRef: "Ester 4:14", bibleVerseText: "Pois, se você ficar calada nesta hora, socorro e livramento surgirão de outra parte para os judeus, mas você e a família de seu pai morrerão. Quem sabe se não foi para um momento como este que você chegou à posição de rainha?" },
    { messageText: "Leticia, seu amor me inspira a ser uma pessoa melhor a cada dia.", bibleVerseRef: "Filipenses 2:3", bibleVerseText: "Não façam nada por ambição egoísta ou por vaidade, mas humildemente considerem os outros superiores a si mesmos." },
    { messageText: "Meu amor Leticia, que a alegria de viver esteja sempre presente em nós.", bibleVerseRef: "Provérbios 15:13", bibleVerseText: "O coração alegre aformoseia o rosto, mas pela dor do coração o espírito se abate." },
    { messageText: "Leticia, que a fé nos una e o amor nos fortaleça para sempre.", bibleVerseRef: "Eclesiastes 4:9-10", bibleVerseText: "É melhor ter companhia do que estar sozinho, porque maior é a recompensa do trabalho de duas pessoas. Se um cair, o amigo pode ajudá-lo a levantar-se. Mas pobre do homem que cai e não tem quem o ajude a levantar-se!" },
    { messageText: "Para Leticia, com todo o meu ser: você é a maior bênção da minha vida.", bibleVerseRef: "Salmos 127:3", bibleVerseText: "Os filhos são herança do Senhor, uma recompensa que ele dá." },
    { messageText: "Leticia, que a paz de Deus, que transcende todo entendimento, nos envolva.", bibleVerseRef: "Isaías 26:3", bibleVerseText: "Tu guardarás em perfeita paz aquele cujo propósito está firme, porque em ti confia." },
    { messageText: "Meu amor Leticia, que a esperança nos mantenha firmes e confiantes no futuro.", bibleVerseRef: "Hebreus 6:19", bibleVerseText: "Temos esta esperança como âncora da alma, firme e segura, a qual adentra o santuário interior, por trás do véu." },
    { messageText: "Leticia, que a bondade e a misericórdia do Senhor nos sigam todos os dias.", bibleVerseRef: "Salmos 23:6", bibleVerseText: "Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias." },
    { messageText: "Para você, Leticia, meu tesouro: que seu dia seja precioso e cheio de alegria.", bibleVerseRef: "Sofonias 3:17", bibleVerseText: "O Senhor, o seu Deus, está em seu meio, poderoso para salvar. Ele se regozijará em você com alegria; em seu amor ele não mais a repreenderá, mas se regozijará em você com cânticos." },
    { messageText: "Leticia, seu amor é o tempero que dá sabor à minha vida. Te amo!", bibleVerseRef: "Mateus 5:13", bibleVerseText: "Vocês são o sal da terra. Mas se o sal perder o seu sabor, como restaurá-lo? Não servirá para nada, exceto para ser jogado fora e pisado pelos homens." },
    { messageText: "Meu amor Leticia, que a cada amanhecer, nosso amor seja a primeira canção.", bibleVerseRef: "Lamentações 3:23", bibleVerseText: "Renovam-se cada manhã; grande é a tua fidelidade!" },
    { messageText: "Leticia, que a presença de Deus seja o nosso refúgio e fortaleza.", bibleVerseRef: "Provérbios 18:10", bibleVerseText: "O nome do Senhor é uma torre forte; os justos correm para ela e estão seguros." },
    { messageText: "Para Leticia, com um amor que cresce a cada dia: você é tudo para mim.", bibleVerseRef: "1 Coríntios 13:13", bibleVerseText: "Assim, permanecem agora estes três: a fé, a esperança e o amor. O maior deles, porém, é o amor." },
    { messageText: "Leticia, que a sabedoria do alto nos guie em todas as nossas decisões.", bibleVerseRef: "Provérbios 2:6", bibleVerseText: "Pois o Senhor concede sabedoria, e da sua boca procedem o conhecimento e o discernimento." },
    { messageText: "Meu amor Leticia, que a alegria do Senhor seja a nossa força constante.", bibleVerseRef: "Filipenses 4:4", bibleVerseText: "Alegrem-se sempre no Senhor. Novamente direi: Alegrem-se!" },
    { messageText: "Leticia, que o nosso amor seja como uma árvore plantada junto a ribeiros.", bibleVerseRef: "Salmos 1:3", bibleVerseText: "É como árvore plantada à beira de águas correntes: Dá fruto no tempo certo e suas folhas não murcham. Tudo o que ele faz prospera!" },
    { messageText: "Para Leticia, a luz dos meus olhos: que seu dia seja iluminado.", bibleVerseRef: "João 8:12", bibleVerseText: "Falando novamente ao povo, Jesus disse: 'Eu sou a luz do mundo. Quem me segue, nunca andará em trevas, mas terá a luz da vida'." },
    { messageText: "Leticia, que a paz de Cristo seja o árbitro em nossos corações.", bibleVerseRef: "Colossenses 3:15", bibleVerseText: "Que a paz de Cristo seja o juiz em seus corações, visto que vocês foram chamados para viver em paz, como membros de um só corpo. E sejam agradecidos." },
    { messageText: "Meu amor Leticia, que a cada passo, sintamos a mão de Deus a nos guiar.", bibleVerseRef: "Isaías 30:21", bibleVerseText: "Quer você se volte para a direita quer para a esquerda, uma voz atrás de você lhe dirá: 'Este é o caminho; siga-o'." },
    { messageText: "Leticia, você é a mais bela canção de amor que Deus compôs para mim.", bibleVerseRef: "Cânticos 2:16", bibleVerseText: "O meu amado é meu, e eu sou dele; ele pastoreia entre os lírios." },
    { messageText: "Para Leticia, com amor e devoção: que nosso lar seja um pedaço do céu.", bibleVerseRef: "Provérbios 24:3-4", bibleVerseText: "Com sabedoria se constrói a casa, e com discernimento se consolida. Pelo conhecimento os seus cômodos se enchem do que é precioso e agradável." },
    { messageText: "Leticia, que a fé nos inspire a sonhar e o amor nos dê forças para realizar.", bibleVerseRef: "Marcos 10:27", bibleVerseText: "Jesus olhou para eles e respondeu: 'Para o homem é impossível, mas não para Deus; todas as coisas são possíveis para Deus'." },
    { messageText: "Meu amor Leticia, que a alegria de estarmos juntos se multiplique a cada dia.", bibleVerseRef: "Romanos 12:10", bibleVerseText: "Dediquem-se uns aos outros com amor fraternal. Prefiram dar honra aos outros mais do que a si próprios." },
    { messageText: "Leticia, que a esperança em Deus renove nossas forças diariamente.", bibleVerseRef: "Salmos 62:5", bibleVerseText: "Descanse somente em Deus, ó minha alma; dele vem a minha esperança." },
    { messageText: "Para Leticia, minha companheira de vida: que o Senhor nos abençoe sempre.", bibleVerseRef: "Gênesis 12:2", bibleVerseText: "Farei de você um grande povo, e o abençoarei. Tornarei famoso o seu nome, e você será uma bênção." },
    { messageText: "Leticia, que o amor seja o laço perfeito a nos unir eternamente.", bibleVerseRef: "1 Pedro 4:8", bibleVerseText: "Sobretudo, amem-se sinceramente uns aos outros, porque o amor perdoa muitíssimos pecados." },
    { messageText: "Meu amor, Leticia, que a paz de Deus seja o nosso abrigo seguro.", bibleVerseRef: "Salmos 91:2", bibleVerseText: "Direi do Senhor: Ele é o meu refúgio e a minha fortaleza, o meu Deus, em quem confio." },
    { messageText: "Leticia, que a cada novo dia, possamos agradecer a Deus pelo nosso amor.", bibleVerseRef: "Salmos 107:1", bibleVerseText: "Deem graças ao Senhor porque ele é bom; o seu amor dura para sempre." },
    { messageText: "Para Leticia, com todo o meu amor: você é a minha maior inspiração.", bibleVerseRef: "Provérbios 31:10", bibleVerseText: "Uma esposa exemplar; feliz quem a encontrar! É muito mais valiosa que os rubis." },
    { messageText: "Leticia, que a luz do amor de Deus brilhe através de nós.", bibleVerseRef: "1 João 1:5", bibleVerseText: "Esta é a mensagem que dele ouvimos e transmitimos a vocês: Deus é luz; nele não há treva alguma." },
    { messageText: "Meu amor, Leticia, que a nossa união seja um testemunho do amor de Deus.", bibleVerseRef: "João 13:35", bibleVerseText: "Com isso todos saberão que vocês são meus discípulos, se vocês se amarem uns aos outros." },
    { messageText: "Leticia, que a cada dia, nosso amor seja mais forte que o dia anterior.", bibleVerseRef: "Cânticos 8:6", bibleVerseText: "Coloque-me como um selo sobre o seu coração, como um selo sobre o seu braço; pois o amor é tão forte quanto a morte, e o ciúme é tão inflexível quanto a sepultura. Suas brasas são fogo ardente, são labaredas do Senhor." },
    { messageText: "Para Leticia, a mulher que ilumina minha vida: te amo infinitamente.", bibleVerseRef: "Salmos 27:1", bibleVerseText: "O Senhor é a minha luz e a minha salvação; de quem terei temor? O Senhor é o meu forte refúgio; de quem terei medo?" }
];

// --- Lógica do Modal de Mensagens Diárias ---
// As variáveis de elementos DOM serão obtidas dentro das funções ou no DOMContentLoaded

// Função para buscar o texto do versículo de uma API
async function fetchVerseTextFromAPI(verseRef) {
    if (!verseRef || typeof verseRef !== 'string' || verseRef.trim() === '') {
        console.warn("fetchVerseTextFromAPI: Referência do versículo inválida:", verseRef);
        throw new Error("Referência do versículo inválida.");
    }
    const translation = "almeida"; 
    const normalizedVerseRef = verseRef.replace(/\s*:\s*/g, ':').replace(/\s+/g, ' ').trim();
    const apiUrl = `https://bible-api.com/${encodeURIComponent(normalizedVerseRef)}?translation=${translation}&verse_numbers=false`;
    console.log(`fetchVerseTextFromAPI: Buscando versículo: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`fetchVerseTextFromAPI: Erro da API Bible (${response.status}) para ${normalizedVerseRef}:`, errorText);
            throw new Error(`Falha ao buscar o versículo (${response.status}). Ref: ${normalizedVerseRef}`);
        }
        const data = await response.json();
        if (data && typeof data.text === 'string') {
            return data.text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        } else if (data && Array.isArray(data.verses) && data.verses.length > 0 && typeof data.verses[0].text === 'string') {
            return data.verses.map(v => v.text).join(" ").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        } else if (data && data.error) {
            console.error("fetchVerseTextFromAPI: Erro retornado pela API Bible:", data.error, "Ref:", normalizedVerseRef);
            throw new Error(`API Bible: ${data.error} (Ref: ${normalizedVerseRef})`);
        } else {
            console.warn("fetchVerseTextFromAPI: Resposta da API Bible não continha texto do versículo para", normalizedVerseRef, ":", data);
            throw new Error(`Resposta inesperada da API Bible para ${normalizedVerseRef}.`);
        }
    } catch (error) {
        console.error(`fetchVerseTextFromAPI: Erro na função para ${normalizedVerseRef}:`, error);
        throw error; 
    }
}
window.fetchVerseTextFromAPI = fetchVerseTextFromAPI;


async function displayStaticMessage() {
    console.log("displayStaticMessage: Chamada para exibir mensagem estática aleatória.");
    const currentMessageTextElement = document.getElementById('messageText');
    const currentVerseTextElement = document.getElementById('verseText');
    const currentNotificationBadgeEl = document.getElementById('notificationBadge');

    if (currentNotificationBadgeEl) {
        currentNotificationBadgeEl.style.display = 'none'; 
    }

    if (!currentMessageTextElement || !currentVerseTextElement) {
        console.error("displayStaticMessage: Elementos do modal de mensagem não encontrados.");
        if (currentMessageTextElement) currentMessageTextElement.textContent = "Erro ao carregar mensagem.";
        if (currentVerseTextElement) currentVerseTextElement.textContent = "Tente novamente.";
        return;
    }

    if (staticDailyMessages && staticDailyMessages.length > 0) {
        const messageIndex = Math.floor(Math.random() * staticDailyMessages.length);
        const selectedMessage = staticDailyMessages[messageIndex];
        console.log(`[Fallback Estático] Mensagem selecionada: Índice ${messageIndex}, Texto: "${selectedMessage ? selectedMessage.messageText : 'N/A'}", Ref Versículo: ${selectedMessage ? selectedMessage.bibleVerseRef : 'N/A'}`);

        if (selectedMessage) {
            currentMessageTextElement.textContent = selectedMessage.messageText;
            currentVerseTextElement.textContent = "A carregar versículo..."; 

            try {
                const fetchedVerseText = await fetchVerseTextFromAPI(selectedMessage.bibleVerseRef);
                currentVerseTextElement.textContent = `${selectedMessage.bibleVerseRef} - "${fetchedVerseText}"`;
            } catch (error) {
                console.warn(`displayStaticMessage: Falha ao buscar versículo da API (${selectedMessage.bibleVerseRef}). Usando fallback interno. Erro: ${error.message}`);
                if (selectedMessage.bibleVerseText && selectedMessage.bibleVerseText.trim() !== "") {
                    currentVerseTextElement.textContent = `${selectedMessage.bibleVerseRef} - "${selectedMessage.bibleVerseText}" (API indisponível)`;
                } else {
                    currentVerseTextElement.textContent = `${selectedMessage.bibleVerseRef} (Texto do versículo indisponível)`;
                }
            }
        } else {
            currentMessageTextElement.textContent = "Mensagem local não encontrada.";
            currentVerseTextElement.textContent = "Verifique a lista de mensagens.";
        }
    } else {
        currentMessageTextElement.textContent = "Nenhuma mensagem local disponível.";
        currentVerseTextElement.textContent = "Por favor, verifique mais tarde.";
    }
}
window.displayStaticMessage = displayStaticMessage; 

function toggleMessageModal() {
    console.log("toggleMessageModal: Chamada.");
    const currentDailyMessageModal = document.getElementById('dailyMessageModal');
    const currentMessageTextElement = document.getElementById('messageText');
    const currentVerseTextElement = document.getElementById('verseText'); 
    const currentCopiedMessageElement = document.getElementById('copiedMessage');
    const currentNotificationBadge = document.getElementById('notificationBadge');

    if (!currentDailyMessageModal || !currentMessageTextElement) { 
        console.error("toggleMessageModal: Modal ou área de texto da mensagem não encontrado.");
        return;
    }

    if (currentDailyMessageModal.style.display === 'none' || currentDailyMessageModal.style.display === '') {
        currentDailyMessageModal.style.display = 'flex';
        if(currentCopiedMessageElement) currentCopiedMessageElement.style.display = 'none'; 
        
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        
        if (localStorage.getItem(`dynamicMessageLoaded_${dateString}`) === 'true') {
             localStorage.setItem(`messageSeen_${dateString}`, 'true'); 
             console.log(`toggleMessageModal: Mensagem dinâmica do dia ${dateString} marcada como vista.`);
        }
        
        if (currentNotificationBadge) currentNotificationBadge.style.display = 'none'; 

        if (typeof window.loadDailyMessage === 'function' && 
            (currentMessageTextElement.textContent === 'Carregando mensagem...' || 
             (currentVerseTextElement && currentVerseTextElement.textContent === 'A carregar versículo...'))) {
            console.log("toggleMessageModal: Modal aberto com estado de carregamento, chamando window.loadDailyMessage().");
            window.loadDailyMessage(); 
        }

    } else {
        currentDailyMessageModal.style.display = 'none';
    }
}
window.toggleMessageModal = toggleMessageModal;

// --- Lógica do Modal de Jogos ---
function toggleGamesModal() {
    console.log("toggleGamesModal: Chamada.");
    const gamesModal = document.getElementById('gamesModal');
    if (gamesModal) {
        if (gamesModal.style.display === 'none' || gamesModal.style.display === '') {
            gamesModal.style.display = 'flex';
        } else {
            gamesModal.style.display = 'none';
        }
    } else {
        console.error("toggleGamesModal: Modal de jogos (gamesModal) não encontrado.");
    }
}
window.toggleGamesModal = toggleGamesModal; 

function launchSnakeGame() { 
    console.log("launchSnakeGame: Abrindo Jogo da Cobrinha em nova aba.");
    const gamesModal = document.getElementById('gamesModal');
    if (gamesModal) gamesModal.style.display = 'none'; 

    const snakeGameHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Cobrinha para Leticia ♡</title>
    <style>
        body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background-color: #fce4ec; font-family: 'Arial', sans-serif; color: #880e4f; }
        h1 { color: #c2185b; margin-bottom: 10px; }
        #gameCanvas { border: 5px solid #f48fb1; background-color: #fff0f6; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: block; }
        .controls-info, .score-info { margin-top: 15px; font-size: 0.9rem; text-align: center; }
        .score-info span { font-weight: bold; color: #ec407a; }
        .game-button { background-color: #ec407a; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: background-color 0.2s ease; margin-top: 10px; }
        .game-button:hover { background-color: #d81b60; }
        #gameOverMessage { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); color: white; padding: 20px; border-radius: 10px; text-align: center; font-size: 1.5rem; display: none; z-index: 100; }
        #gameOverMessage .game-button { margin-top: 10px; background-color: #f48fb1; color: #880e4f; }
        #gameOverMessage .game-button:hover { background-color: #f8bbd0; }
    </style>
</head>
<body>
    <h1>Jogo da Cobrinha <i style="color: #e91e63;">♡</i></h1>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div class="score-info">Pontuação: <span id="score">0</span></div>
    <div class="controls-info">Use as teclas de seta (↑, ↓, ←, →) para mover.</div>
    <button id="backToCalculatorButtonSnake" class="game-button">Voltar à Calculadora</button>
    <div id="gameOverMessage">
        Game Over!
        <button id="gameOverRestartButton" class="game-button">Jogar Novamente</button>
    </div>
    <script>
        console.log("Snake Game Script: Iniciando...");
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('Snake Game Error: Canvas not found in new tab!');
            document.body.innerHTML = "<h1>Erro Crítico: Canvas do jogo não encontrado.</h1>";
        } else {
            console.log('Snake Game: Canvas encontrado', canvas.width, canvas.height);
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error('Snake Game Error: Contexto 2D não obtido!');
                document.body.innerHTML = "<h1>Erro Crítico: Não foi possível iniciar o motor gráfico do jogo.</h1>";
            } else {
                console.log('Snake Game: Contexto 2D obtido.');
                ctx.fillStyle = '#fff0f6'; 
                ctx.fillRect(0, 0, canvas.width, canvas.height); 

                const scoreElement = document.getElementById('score');
                const gameOverMessageDiv = document.getElementById('gameOverMessage');
                const gameOverRestartButton = document.getElementById('gameOverRestartButton');
                const backButton = document.getElementById('backToCalculatorButtonSnake');

                const gridSize = 20;
                const tileCount = canvas.width / gridSize;
                let snake, food, dx, dy, score, gameLoopInterval, gameActive;

                function initializeGame() {
                    console.log("Snake Game: Initializing game logic in new tab...");
                    snake = [{ x: 10, y: 10 }];
                    food = getRandomFoodPosition();
                    dx = 1; dy = 0; score = 0; gameActive = true;
                    updateScoreDisplay();
                    if(gameOverMessageDiv) gameOverMessageDiv.style.display = 'none';
                    if (gameLoopInterval) clearInterval(gameLoopInterval);
                    gameLoopInterval = setInterval(gameLoop, 180); // Velocidade ajustada
                    console.log("Snake Game: Initialized. Snake:", snake[0], "Food:", food);
                }
                function getRandomFoodPosition() {
                    let newFoodPosition;
                    while (true) {
                        newFoodPosition = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
                        let collisionWithSnake = snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y);
                        if (!collisionWithSnake) break;
                    }
                    return newFoodPosition;
                }
                function drawSnakePart(snakePart) {
                    ctx.fillStyle = '#ec407a'; ctx.strokeStyle = '#c2185b';
                    ctx.fillRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize -1, gridSize -1); 
                    ctx.strokeRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize -1, gridSize -1);
                }
                function drawSnake() { snake.forEach(drawSnakePart); }
                function drawFood() {
                    ctx.fillStyle = '#880e4f'; ctx.strokeStyle = '#5c1a3c';
                    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize -1, gridSize-1);
                    ctx.strokeRect(food.x * gridSize, food.y * gridSize, gridSize-1, gridSize-1);
                }
                function moveSnake() {
                    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
                    snake.unshift(head);
                    if (head.x === food.x && head.y === food.y) {
                        score++; updateScoreDisplay(); food = getRandomFoodPosition();
                    } else {
                        snake.pop();
                    }
                }
                function updateScoreDisplay() { if(scoreElement) scoreElement.textContent = score; }
                function checkCollision() {
                    const head = snake[0];
                    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return true;
                    for (let i = 1; i < snake.length; i++) { if (head.x === snake[i].x && head.y === snake[i].y) return true; }
                    return false;
                }
                function gameLoop() {
                    if (!gameActive) return;
                    ctx.fillStyle = '#fff0f6'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    moveSnake();
                    if (checkCollision()) { gameOver(); return; }
                    drawFood(); drawSnake();
                }
                function gameOver() {
                    gameActive = false; clearInterval(gameLoopInterval);
                    if(gameOverMessageDiv) gameOverMessageDiv.style.display = 'block';
                     console.log("Snake Game: Game Over! Score: " + score);
                }
                document.addEventListener('keydown', (event) => {
                    if (!gameActive && event.key !== "Enter" && event.keyCode !== 13) return; 
                    const keyPressed = event.key; 
                    const goingUp = dy === -1, goingDown = dy === 1, goingRight = dx === 1, goingLeft = dx === -1;

                    if ((keyPressed === "ArrowLeft" || keyPressed.toLowerCase() === "a") && !goingRight) { dx = -1; dy = 0; }
                    else if ((keyPressed === "ArrowUp" || keyPressed.toLowerCase() === "w") && !goingDown) { dx = 0; dy = -1; }
                    else if ((keyPressed === "ArrowRight" || keyPressed.toLowerCase() === "d") && !goingLeft) { dx = 1; dy = 0; }
                    else if ((keyPressed === "ArrowDown" || keyPressed.toLowerCase() === "s") && !goingUp) { dx = 0; dy = 1; }
                });
                if(gameOverRestartButton) gameOverRestartButton.addEventListener('click', initializeGame);
                if(backButton) backButton.addEventListener('click', () => window.close());
                
                if (canvas && ctx) {
                    initializeGame();
                } else {
                    console.error("Snake Game: Não foi possível iniciar o jogo pois o canvas ou o contexto não foram encontrados na nova aba.");
                }
            }
        }
    <\/script>
</body>
</html>
    `;
    const gameWindow = window.open('', '_blank');
    if (gameWindow) {
        gameWindow.document.open();
        gameWindow.document.write(snakeGameHTML);
        gameWindow.document.close(); 
        console.log("Jogo da Cobrinha aberto em nova aba.");
        gameWindow.focus(); 
    } else {
        alert("Não foi possível abrir a aba do jogo. Verifique se o seu navegador está a bloquear pop-ups.");
    }
}
window.launchSnakeGame = launchSnakeGame; 

function launchTankGame() { 
    console.log("launchTankGame: Abrindo Jogo de Tanque em nova aba.");
    const gamesModal = document.getElementById('gamesModal');
    if (gamesModal) gamesModal.style.display = 'none'; 

    const tankGameHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Defesa de Tanques para Leticia ♡</title>
    <style>
        body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background-color: #ffe0e0; font-family: 'Arial', sans-serif; color: #7c1c3a; }
        h1 { color: #c2185b; margin-bottom: 10px; }
        #gameCanvas { border: 5px solid #f06292; background-color: #fdf0f3; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: block; }
        .info-container { display: flex; justify-content: space-around; width: 500px; margin-top: 10px; font-size: 1rem; }
        .score-info span, .enemies-info span { font-weight: bold; color: #ec407a; }
        .controls-info { margin-top: 10px; font-size: 0.85rem; text-align: center; max-width: 500px; }
        .game-button { background-color: #e91e63; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: background-color 0.2s ease; margin-top: 15px; margin-left: 5px; margin-right: 5px; }
        .game-button:hover { background-color: #c2185b; }
        #gameOverMessage { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.75); color: white; padding: 25px; border-radius: 10px; text-align: center; font-size: 1.8rem; display: none; z-index: 100; }
        #gameOverMessage .game-button { margin-top: 15px; background-color: #f48fb1; color: #880e4f; }
        #gameOverMessage .game-button:hover { background-color: #f8bbd0; }
    </style>
</head>
<body>
    <h1>Defesa de Tanques <i class="fas fa-shield-heart" style="color: #e91e63;"></i>♡</h1>
    <canvas id="gameCanvas" width="500" height="450"></canvas>
    <div class="info-container">
        <div class="score-info">Pontuação: <span id="score">0</span></div>
        <div class="enemies-info">Inimigos Restantes: <span id="enemiesLeft">0</span></div>
    </div>
    <div class="controls-info">
        Setas: Mover Tanque | A/D: Rodar Torre | Espaço: Atirar
    </div>
    <div>
        <button id="backToCalculatorButtonTank" class="game-button">Voltar à Calculadora</button>
    </div>
    <div id="gameOverMessage">
        Fim de Jogo!
        <div class="score-info" style="font-size: 1.2rem; margin-top:10px;">Pontuação Final: <span id="finalScore">0</span></div>
        <button id="gameOverRestartButton" class="game-button">Jogar Novamente</button>
    </div>
    <script>
        // JavaScript completo do Jogo de Tanque (como fornecido anteriormente)
        // ... (Este é o local do script do jogo que lhe dei no Canvas "jogoTanqueGuerraHTML")
        console.log("Tank Defense Game Script: Iniciando...");
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) {
            console.error('Tank Game Error: Canvas not found in new tab!');
            document.body.innerHTML = "<h1>Erro Crítico: Canvas do jogo não encontrado.</h1>";
        } else {
            console.log('Tank Game: Canvas encontrado', canvas.width, canvas.height);
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error('Tank Game Error: Contexto 2D não obtido!');
                document.body.innerHTML = "<h1>Erro Crítico: Não foi possível iniciar o motor gráfico do jogo.</h1>";
            } else {
                console.log('Tank Game: Contexto 2D obtido.');
                ctx.fillStyle = '#fdf0f3'; 
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const scoreElement = document.getElementById('score');
                const enemiesLeftElement = document.getElementById('enemiesLeft');
                const gameOverMessageDiv = document.getElementById('gameOverMessage');
                const finalScoreElement = document.getElementById('finalScore');
                const gameOverRestartButton = document.getElementById('gameOverRestartButton');
                const backButton = document.getElementById('backToCalculatorButtonTank'); // ID único para este botão

                const TANK_SIZE = 30; 
                const TURRET_WIDTH = 6;
                const TURRET_LENGTH = 25;
                const BULLET_RADIUS = 4;
                const BULLET_SPEED = 5;
                const BASE_SIZE = 40;
                const BRICK_SIZE = 20;

                let player, bullets, enemyBullets, enemies, playerBase, bricks, score, gameActive, gameLoopInterval, enemiesToSpawn, spawnTimer, spawnInterval;

                const PLAYER_TANK_COLOR = '#ec407a'; 
                const PLAYER_TURRET_COLOR = '#c2185b'; 
                const ENEMY_TANK_COLOR = '#ad1457'; 
                const ENEMY_TURRET_COLOR = '#880e4f'; 
                const BULLET_COLOR = '#7c1c3a'; 
                const BASE_COLOR = '#ff80ab'; 
                const BASE_BORDER_COLOR = '#f50057';
                const BRICK_COLOR = '#f48fb1'; 
                const BRICK_BORDER_COLOR = '#e91e63';

                function initializeGame() {
                    console.log("Tank Defense Game: Initializing game logic...");
                    player = { x: canvas.width / 2 - TANK_SIZE / 2, y: canvas.height - TANK_SIZE - BRICK_SIZE - 5, width: TANK_SIZE, height: TANK_SIZE, turretAngle: -Math.PI / 2, speed: 2.5, rotationSpeed: 0.04, color: PLAYER_TANK_COLOR, shootCooldown: 0, maxCooldown: 20 };
                    playerBase = { x: canvas.width / 2 - BASE_SIZE / 2, y: canvas.height - BASE_SIZE - 5, width: BASE_SIZE, height: BASE_SIZE, color: BASE_COLOR, borderColor: BASE_BORDER_COLOR, isAlive: true };
                    bullets = []; enemyBullets = []; enemies = []; bricks = [];
                    score = 0; enemiesToSpawn = 5; spawnTimer = 0; spawnInterval = 180; gameActive = true;
                    updateScoreDisplay(); updateEnemiesLeftDisplay(); createBrickWall();
                    if(gameOverMessageDiv) gameOverMessageDiv.style.display = 'none';
                    if (gameLoopInterval) clearInterval(gameLoopInterval);
                    gameLoopInterval = setInterval(gameLoop, 1000 / 60); 
                    console.log("Tank Defense Game: Initialized.");
                }
                function createBrickWall() {
                    bricks = []; 
                    const wallY = playerBase.y - BRICK_SIZE - 2; 
                    const wallStartX = playerBase.x - BRICK_SIZE;
                    const wallEndX = playerBase.x + BASE_SIZE + BRICK_SIZE;
                    for (let x = wallStartX; x < wallEndX; x += BRICK_SIZE) { bricks.push({ x: x, y: wallY, width: BRICK_SIZE, height: BRICK_SIZE, hp: 1 });}
                    bricks.push({ x: playerBase.x - BRICK_SIZE, y: playerBase.y, width: BRICK_SIZE, height: BRICK_SIZE, hp: 1 });
                    bricks.push({ x: playerBase.x - BRICK_SIZE, y: playerBase.y + BRICK_SIZE/2 , width: BRICK_SIZE, height: BRICK_SIZE, hp: 1 }); 
                    bricks.push({ x: playerBase.x + BASE_SIZE, y: playerBase.y, width: BRICK_SIZE, height: BRICK_SIZE, hp: 1 });
                    bricks.push({ x: playerBase.x + BASE_SIZE, y: playerBase.y + BRICK_SIZE/2, width: BRICK_SIZE, height: BRICK_SIZE, hp: 1 });
                }
                function spawnEnemy() {
                    if (enemiesToSpawn <= 0) return;
                    const spawnX = Math.random() * (canvas.width - TANK_SIZE);
                    enemies.push({ x: spawnX, y: -TANK_SIZE, width: TANK_SIZE, height: TANK_SIZE, turretAngle: Math.PI / 2, speed: 1 + Math.random() * 0.5, color: ENEMY_TANK_COLOR, shootCooldown: Math.floor(Math.random() * 100) + 80, maxCooldown: 120 + Math.floor(Math.random() * 60) });
                    enemiesToSpawn--; updateEnemiesLeftDisplay();
                }
                function updateEnemiesLeftDisplay() { if(enemiesLeftElement) enemiesLeftElement.textContent = enemies.length + enemiesToSpawn; }
                function drawRect(obj, color, borderColor) {
                    ctx.fillStyle = color; ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                    if (borderColor) { ctx.strokeStyle = borderColor; ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); }
                }
                function drawTank(tank, turretColor) {
                    drawRect(tank, tank.color); 
                    ctx.save(); ctx.translate(tank.x + tank.width / 2, tank.y + tank.height / 2); ctx.rotate(tank.turretAngle);
                    ctx.fillStyle = turretColor; ctx.fillRect(-TURRET_WIDTH / 2, -TURRET_LENGTH / 2, TURRET_WIDTH, TURRET_LENGTH);
                    ctx.beginPath(); ctx.arc(0, 0, tank.width / 3.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
                }
                function drawBullet(bullet) { ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2); ctx.fillStyle = BULLET_COLOR; ctx.fill(); ctx.closePath(); }
                function drawBricks() { bricks.forEach(brick => { drawRect(brick, BRICK_COLOR, BRICK_BORDER_COLOR); }); }
                function updatePlayer() { if (player.shootCooldown > 0) player.shootCooldown--; }
                function updateEnemies() {
                    enemies.forEach(enemy => {
                        enemy.y += enemy.speed;
                        if (enemy.y > canvas.height) { enemies.splice(enemies.indexOf(enemy), 1); updateEnemiesLeftDisplay(); return; }
                        enemy.turretAngle = Math.PI / 2; 
                        if (enemy.shootCooldown <= 0) {
                            enemyBullets.push({ x: enemy.x + enemy.width / 2 + (TURRET_LENGTH - 5) * Math.cos(enemy.turretAngle), y: enemy.y + enemy.height / 2 + (TURRET_LENGTH - 5) * Math.sin(enemy.turretAngle), radius: BULLET_RADIUS, dx: BULLET_SPEED * Math.cos(enemy.turretAngle), dy: BULLET_SPEED * Math.sin(enemy.turretAngle) });
                            enemy.shootCooldown = enemy.maxCooldown;
                        } else { enemy.shootCooldown--; }
                    });
                }
                function updateBullets(bulletArray) {
                    for (let i = bulletArray.length - 1; i >= 0; i--) {
                        const bullet = bulletArray[i];
                        bullet.x += bullet.dx; bullet.y += bullet.dy;
                        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) { bulletArray.splice(i, 1); }
                    }
                }
                function checkCollisions() {
                    for (let i = bullets.length - 1; i >= 0; i--) {
                        for (let j = enemies.length - 1; j >= 0; j--) {
                            if (rectCollision(bullets[i], enemies[j], BULLET_RADIUS)) {
                                bullets.splice(i, 1); enemies.splice(j, 1); score += 10;
                                updateScoreDisplay(); updateEnemiesLeftDisplay(); break; 
                            }
                        }
                    }
                    for (let i = enemyBullets.length - 1; i >= 0; i--) {
                        if (rectCollision(enemyBullets[i], player, BULLET_RADIUS)) {
                            enemyBullets.splice(i, 1); gameOver("Seu tanque foi atingido!"); return;
                        }
                    }
                    const allBullets = [...bullets, ...enemyBullets];
                    for (let i = allBullets.length - 1; i >= 0; i--) {
                        for (let j = bricks.length - 1; j >= 0; j--) {
                             if (rectCollision(allBullets[i], bricks[j], BULLET_RADIUS)) {
                                allBullets.splice(i,1); bricks.splice(j, 1); break; 
                            }
                        }
                    }
                    if (playerBase.isAlive) {
                        for (let i = enemyBullets.length - 1; i >= 0; i--) {
                            if (rectCollision(enemyBullets[i], playerBase, BULLET_RADIUS)) {
                                enemyBullets.splice(i, 1); playerBase.isAlive = false; playerBase.color = "#555"; 
                                gameOver("Sua base foi destruída!"); return;
                            }
                        }
                        enemies.forEach(enemy => {
                            if (rectsOverlap(enemy, playerBase)) {
                                playerBase.isAlive = false; playerBase.color = "#555";
                                gameOver("Um inimigo alcançou sua base!");
                            }
                        });
                    }
                }
                function rectCollision(circle, rect, circleRadius) { 
                    let testX = circle.x; let testY = circle.y;
                    if (circle.x < rect.x) testX = rect.x; else if (circle.x > rect.x + rect.width) testX = rect.x + rect.width;
                    if (circle.y < rect.y) testY = rect.y; else if (circle.y > rect.y + rect.height) testY = rect.y + rect.height;
                    const distX = circle.x - testX; const distY = circle.y - testY;
                    return Math.sqrt((distX * distX) + (distY * distY)) <= circleRadius;
                }
                function rectsOverlap(rect1, rect2) { return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y; }
                function updateScoreDisplay() { if(scoreElement) scoreElement.textContent = score; }
                function gameLoop() {
                    if (!gameActive) return;
                    spawnTimer++;
                    if (spawnTimer >= spawnInterval && enemiesToSpawn > 0) { spawnEnemy(); spawnTimer = 0; }
                    handleInput(); updatePlayer(); updateEnemies(); updateBullets(bullets); updateBullets(enemyBullets); checkCollisions();
                    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#fdf0f3'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    drawBricks(); 
                    if (playerBase.isAlive) drawRect(playerBase, playerBase.color, playerBase.borderColor); else drawRect(playerBase, "#777", "#555"); 
                    drawTank(player, PLAYER_TURRET_COLOR); enemies.forEach(enemy => drawTank(enemy, ENEMY_TURRET_COLOR));
                    bullets.forEach(drawBullet); enemyBullets.forEach(drawBullet);
                    if (enemiesToSpawn === 0 && enemies.length === 0 && playerBase.isAlive) { gameOver("Vitória! Todos os inimigos destruídos!"); }
                }
                function gameOver(message = "Fim de Jogo!") {
                    console.log("Tank Defense Game: Game Over. Score:", score, "Message:", message);
                    gameActive = false; clearInterval(gameLoopInterval);
                    if(finalScoreElement) finalScoreElement.textContent = score;
                    const gameOverTextElement = gameOverMessageDiv.firstChild; 
                    if (gameOverTextElement && gameOverTextElement.nodeType === Node.TEXT_NODE) { gameOverTextElement.nodeValue = message; } 
                    else if (gameOverMessageDiv) { gameOverMessageDiv.childNodes[0].nodeValue = message; } // Tenta o primeiro filho de qualquer forma
                    if(gameOverMessageDiv) gameOverMessageDiv.style.display = 'block';
                }
                const keys = {};
                document.addEventListener('keydown', (event) => {
                    keys[event.key.toLowerCase()] = true;
                    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "a", "d"].includes(event.key.toLowerCase())) { event.preventDefault(); }
                    if (event.key === ' ' && gameActive && player.shootCooldown <= 0) { 
                        bullets.push({ x: player.x + player.width / 2 + (TURRET_LENGTH - 5) * Math.cos(player.turretAngle), y: player.y + player.height / 2 + (TURRET_LENGTH - 5) * Math.sin(player.turretAngle), radius: BULLET_RADIUS, dx: BULLET_SPEED * Math.cos(player.turretAngle), dy: BULLET_SPEED * Math.sin(player.turretAngle) });
                        player.shootCooldown = player.maxCooldown;
                    }
                });
                document.addEventListener('keyup', (event) => { keys[event.key.toLowerCase()] = false; });
                function handleInput() {
                    if (!gameActive) return;
                    if (keys['arrowleft']) player.x -= player.speed; if (keys['arrowright']) player.x += player.speed;
                    if (keys['arrowup']) player.y -= player.speed; if (keys['arrowdown']) player.y += player.speed;
                    if (keys['a']) player.turretAngle -= player.rotationSpeed; if (keys['d']) player.turretAngle += player.rotationSpeed;
                    player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
                    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
                }
                if(gameOverRestartButton) gameOverRestartButton.addEventListener('click', initializeGame);
                if(backButton) backButton.addEventListener('click', () => window.close());
                
                if (canvas && ctx && scoreElement && enemiesLeftElement) { initializeGame(); } 
                else { console.error("Tank Defense Game: Elementos essenciais do DOM não encontrados ao tentar inicializar o jogo."); document.body.innerHTML = "<h1>Erro ao carregar o jogo. Elementos em falta.</h1>"; }
                console.log("Tank Defense Game Script: Fim da execução.");
            }
        }
    <\/script>
</body>
</html>
    `;
    const gameWindow = window.open('', '_blank');
    if (gameWindow) {
        gameWindow.document.open();
        gameWindow.document.write(tankGameHTML);
        gameWindow.document.close(); 
        console.log("Jogo de Tanque aberto em nova aba.");
        gameWindow.focus();
    } else {
        alert("Não foi possível abrir a aba do jogo. Verifique se o seu navegador está a bloquear pop-ups.");
    }
}
window.launchTankGame = launchTankGame; // Expor para onclick no HTML


async function shareMessage() {
    console.log("shareMessage: Chamada.");
    const currentMessageTextElement = document.getElementById('messageText');
    const currentVerseTextElement = document.getElementById('verseText');
    const currentCopiedMessageElement = document.getElementById('copiedMessage');

    if (!currentMessageTextElement || !currentVerseTextElement) {
        console.error("shareMessage: Elementos de texto da mensagem não encontrados.");
        return;
    }

    const messageToShare = currentMessageTextElement.textContent;
    const verseToShare = currentVerseTextElement.textContent; 
    const fullTextToShare = `Para Leticia ♡:\n\n"${messageToShare}"\n\n${verseToShare}\n\nEnviado com amor pela Calculadora Especial!`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Mensagem Especial para Leticia',
                text: fullTextToShare,
            });
            console.log('Mensagem partilhada com sucesso via API de Partilha!');
        } catch (error) {
            console.error('Erro ao partilhar via API:', error);
            copyToClipboard(fullTextToShare, currentCopiedMessageElement);
        }
    } else {
        console.log("API de Partilha não suportada, a recorrer a copiar para a área de transferência.");
        copyToClipboard(fullTextToShare, currentCopiedMessageElement);
    }
}
// shareMessage é chamado por um event listener no DOMContentLoaded

function copyToClipboard(text, feedbackElement) {
    console.log("copyToClipboard: Tentando copiar texto.");
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; 
    textarea.style.opacity = 0; 
    document.body.appendChild(textarea);
    textarea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            if (feedbackElement) {
                feedbackElement.textContent = 'Copiado para a área de transferência!';
                feedbackElement.style.display = 'block';
                setTimeout(() => {
                    if (feedbackElement) feedbackElement.style.display = 'none';
                }, 2000);
            }
            console.log('Texto copiado para a área de transferência com sucesso.');
        } else {
            throw new Error('document.execCommand("copy") falhou.');
        }
    } catch (err) {
        console.error('Não foi possível copiar o texto:', err);
        if (feedbackElement) {
            feedbackElement.textContent = 'Erro ao copiar. Tente manualmente.';
            feedbackElement.style.display = 'block';
            setTimeout(() => {
                if (feedbackElement) feedbackElement.style.display = 'none';
            }, 3000);
        }
    }
    document.body.removeChild(textarea);
}

// --- Lógica do Modo Escuro ---
function applyDarkModePreference() {
    const currentDarkModeToggle = document.getElementById('darkModeToggle');
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    const toggleButtonIcon = currentDarkModeToggle ? currentDarkModeToggle.querySelector('i') : null;

    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        if (toggleButtonIcon) {
            toggleButtonIcon.classList.remove('fa-moon');
            toggleButtonIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('dark-mode');
         if (toggleButtonIcon) {
            toggleButtonIcon.classList.remove('fa-sun');
            toggleButtonIcon.classList.add('fa-moon');
        }
    }
    console.log(`applyDarkModePreference: Modo escuro ${darkModeEnabled ? 'ativado' : 'desativado'}.`);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkModeEnabled', isDarkMode);
    applyDarkModePreference(); 
    console.log(`toggleDarkMode: Modo escuro alterado para ${isDarkMode}.`);
}
// toggleDarkMode é chamado por um event listener no DOMContentLoaded

// --- Lógica da Calculadora ---
const display = document.getElementById('display'); 
let currentExpression = '';
let lastInputIsOperator = false;
let resultCalculated = false;

function checkDisplay() {
    if (!display) {
        console.error("Visor da calculadora (elemento com ID 'display') NÃO ENCONTRADO! As funções da calculadora não irão operar.");
        return false;
    }
    return true;
}

function appendNumber(number) {
    if (!checkDisplay()) return;
    // console.log("appendNumber:", number); 
    if (resultCalculated) {
        currentExpression = '';
        resultCalculated = false;
    }
    if (currentExpression.length > 18 && !lastInputIsOperator) {
        // console.warn("Limite de caracteres atingido para o número.");
        return;
    }
    if (currentExpression === '0' && number !== '.') {
        currentExpression = number;
    } else {
        currentExpression += number;
    }
    updateDisplay();
    lastInputIsOperator = false;
}
window.appendNumber = appendNumber; 

function appendOperator(operator) {
    if (!checkDisplay()) return;
    // console.log("appendOperator:", operator); 
    if (currentExpression === '' && operator !== '-') {
        return;
    }
    if (lastInputIsOperator) {
        if (currentExpression.length > 1 || operator !== '-') {
             currentExpression = currentExpression.slice(0, -1) + operator;
        } else if (operator === '-' && currentExpression !== '-') {
            currentExpression += operator;
        }
    } else {
        currentExpression += operator;
    }
    updateDisplay();
    lastInputIsOperator = true;
    resultCalculated = false;
}
window.appendOperator = appendOperator; 

function appendDecimal() {
    if (!checkDisplay()) return;
    // console.log("appendDecimal"); 
    if (resultCalculated) {
        currentExpression = '0.';
        resultCalculated = false;
    } else {
        const parts = currentExpression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (currentExpression === '' || lastInputIsOperator || currentExpression.endsWith('+') || currentExpression.endsWith('-') || currentExpression.endsWith('*') || currentExpression.endsWith('/')) {
            currentExpression += '0.';
        } else if (lastPart && !lastPart.includes('.')) { 
            currentExpression += '.';
        }
    }
    updateDisplay();
    lastInputIsOperator = false;
}
window.appendDecimal = appendDecimal; 

function clearAll() {
    if (!checkDisplay()) return;
    console.log("clearAll");
    currentExpression = '0';
    updateDisplay();
    currentExpression = '';
    lastInputIsOperator = false;
    resultCalculated = false;
}
window.clearAll = clearAll; 

function deleteLast() {
    if (!checkDisplay()) return;
    // console.log("deleteLast"); 
    if (resultCalculated) {
        clearAll();
        return;
    }
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        if (currentExpression === '') {
            currentExpression = '0';
            updateDisplay();
            currentExpression = '';
        } else {
             updateDisplay();
        }
        const lastChar = currentExpression.charAt(currentExpression.length - 1);
        lastInputIsOperator = ['+', '-', '*', '/'].includes(lastChar);
    } else {
        currentExpression = '0';
        updateDisplay();
        currentExpression = '';
    }
}
window.deleteLast = deleteLast; 

function calculateResult() {
    if (!checkDisplay()) return;
    console.log("calculateResult");
    if (currentExpression === '' || (lastInputIsOperator && !(currentExpression.startsWith('-') && currentExpression.match(/^-?\d+(\.\d+)?$/)))) {
        return;
    }

    try {
        let evalExpression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
        if (!/^[0-9.+\-*/\s().eE]+$/.test(evalExpression) || evalExpression.includes('**') || evalExpression.includes('//')) {
             throw new Error("Expressão inválida ou não suportada.");
        }
        if (/\/0(?![.\d])/.test(evalExpression)) { 
            if (display) display.textContent = 'Erro ÷0';
            currentExpression = '';
            resultCalculated = true;
            lastInputIsOperator = false;
            return;
        }
        let result = new Function('return ' + evalExpression)();

        if (Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error("Resultado inválido (NaN ou Infinito)");
        }
        
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-9 && result !== 0)) {
            currentExpression = result.toExponential(6);
        } else {
            result = parseFloat(result.toFixed(10)); 
            currentExpression = result.toString();
        }
        updateDisplay();
        resultCalculated = true;
        lastInputIsOperator = false; 
    } catch (error) {
        if (display) display.textContent = 'Erro';
        console.error("Erro de cálculo:", error.message, "Expressão:", currentExpression);
        currentExpression = ''; 
        resultCalculated = true;
        lastInputIsOperator = false;
    }
}
window.calculateResult = calculateResult; 

function updateDisplay() {
    if (!checkDisplay()) return; 
    let displayValue = currentExpression;
    if (displayValue === '') {
        displayValue = '0';
    } else {
        displayValue = displayValue.replace(/\*/g, '×').replace(/\//g, '÷');
    }

    if (display.style) { 
        if (displayValue.length > 12 && displayValue.length <= 15) {
            display.style.fontSize = '2rem';
        } else if (displayValue.length > 15) {
            display.style.fontSize = '1.5rem'; 
        } else {
            display.style.fontSize = '2.5rem'; 
        }
    }
    display.textContent = displayValue;
}

// Adicionar event listeners após o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded: Configurando listeners e estado inicial.");
    
    const localShareButton = document.getElementById('shareMessageButton');
    const localDarkModeToggle = document.getElementById('darkModeToggle');

    if (localShareButton) {
        localShareButton.addEventListener('click', shareMessage);
        console.log("Listener para shareMessageButton configurado.");
    } else {
        console.warn("Botão de partilha (shareMessageButton) não encontrado no DOM.");
    }

    if (localDarkModeToggle) {
        localDarkModeToggle.addEventListener('click', toggleDarkMode);
        console.log("Listener para darkModeToggle configurado.");
    } else {
        console.warn("Botão de modo escuro (darkModeToggle) não encontrado no DOM.");
    }

    applyDarkModePreference(); 

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const currentMsgModal = document.getElementById('dailyMessageModal'); 
        const currentGamesModal = document.getElementById('gamesModal');

        if (key >= '0' && key <= '9') appendNumber(key);
        else if (key === '.') appendDecimal();
        else if (key === '+') appendOperator('+');
        else if (key === '-') appendOperator('-');
        else if (key === '*') appendOperator('*');
        else if (key === '/') { event.preventDefault(); appendOperator('/'); }
        else if (key === 'Enter' || key === '=') { event.preventDefault(); calculateResult(); }
        else if (key === 'Backspace') deleteLast();
        else if (key === 'Escape') {
            if (currentMsgModal && currentMsgModal.style.display === 'flex') {
                toggleMessageModal(); 
            } else if (currentGamesModal && currentGamesModal.style.display === 'flex') {
                toggleGamesModal();
            }
            else {
                clearAll(); 
            }
        }
        else if (key.toLowerCase() === 'c' && !(event.metaKey || event.ctrlKey)) clearAll();
    });
    console.log("Listener de teclado configurado.");

    if (display) { 
        clearAll();
        console.log("Calculadora inicializada.");
    } else {
        console.error("CRÍTICO: Elemento de display da calculadora (ID 'display') não encontrado no DOMContentLoaded. Os botões da calculadora não funcionarão.");
    }
    console.log("Script.js: Execução de DOMContentLoaded concluída.");
});

console.log("script.js: Fim da execução do script (antes de DOMContentLoaded para alguns listeners).");
