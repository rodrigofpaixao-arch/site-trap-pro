async function getRanking() {
  let { data } = await supabase
    .from('pontuacoes')
    .select(`
      pontos,
      atiradores(nome, clubes(nome))
    `);

  let ranking = {};

  data.forEach(p => {
    let nome = p.atiradores.nome;

    if (!ranking[nome]) {
      ranking[nome] = {
        pontos: 0,
        clube: p.atiradores.clubes.nome
      };
    }

    ranking[nome].pontos += p.pontos;
  });

  return Object.entries(ranking)
    .map(([nome, dados]) => ({
      nome,
      pontos: dados.pontos,
      clube: dados.clube
    }))
    .sort((a,b) => b.pontos - a.pontos);
}