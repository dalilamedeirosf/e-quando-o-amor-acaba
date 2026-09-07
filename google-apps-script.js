/**
 * RECEBEDOR DE LEADS — Google Apps Script
 * ---------------------------------------
 * Cole este código em script.google.com, dentro da planilha que vai receber
 * os leads, e publique como aplicativo web. A página passa a enviar cada
 * cadastro direto para cá, sem precisar de servidor.
 *
 * COMO INSTALAR (5 minutos)
 *
 * 1. Crie uma planilha nova no Google Sheets.
 *    Renomeie a primeira aba para: Leads
 *
 * 2. No menu da planilha: Extensões > Apps Script.
 *
 * 3. Apague o conteúdo do editor e cole TODO este arquivo.
 *
 * 4. Clique em Implantar > Nova implantação.
 *    - Tipo: Aplicativo da Web
 *    - Executar como: Eu
 *    - Quem pode acessar: QUALQUER PESSOA
 *      (obrigatório: é o navegador da visitante que envia, não você)
 *
 * 5. Autorize quando pedir. O Google vai avisar que o app não é verificado —
 *    é o seu próprio script, pode seguir em "Avançado > Ir para...".
 *
 * 6. Copie a URL que termina em /exec e me mande.
 *    É ela que entra no index.html.
 *
 * OBSERVAÇÃO SOBRE DADOS PESSOAIS
 * A planilha vai guardar nome e telefone de pessoas reais. Não compartilhe
 * com link público — só com quem precisa atender. Trate como cadastro de
 * cliente, porque é o que é.
 */

var ABA = 'Leads';

function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents);

    var nome = String(dados.name || '').trim().slice(0, 120);
    var telefone = String(dados.phone || '').trim().slice(0, 40);
    if (!nome || !telefone) {
      return responder({ success: false, error: 'nome e telefone sao obrigatorios' });
    }

    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);

    // cabeçalho, só na primeira vez
    if (aba.getLastRow() === 0) {
      aba.appendRow(['Data', 'Nome', 'WhatsApp', 'Resultado', 'Trilha', 'Origem']);
      aba.setFrozenRows(1);
    }

    aba.appendRow([
      new Date(),
      nome,
      telefone,
      String(dados.resultado || '').slice(0, 120),
      String(dados.trilha || '').slice(0, 120),
      String(dados.origem || '').slice(0, 200)
    ]);

    return responder({ success: true });
  } catch (erro) {
    return responder({ success: false, error: String(erro) });
  }
}

function doGet() {
  // Só para conferir no navegador que a publicação funcionou.
  return responder({ ok: true, servico: 'recebedor de leads' });
}

function responder(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
