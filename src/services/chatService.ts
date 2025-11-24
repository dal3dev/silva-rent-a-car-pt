export async function enviarMensagem(texto: string): Promise<string> {
  // Simulação de resposta do assistente
  return new Promise((resolve) => {
    setTimeout(() => {
      const respostas = [
        "Obrigado pela sua mensagem! Em que mais posso ajudar?",
        "Posso ajudar-te a encontrar o carro perfeito para as tuas necessidades.",
        "Temos uma frota diversificada desde citadinos económicos a SUVs espaçosos.",
        "Para reservas, podes usar o formulário de pesquisa no topo da página.",
        "Oferecemos condições especiais para alugueres de longa duração."
      ];
      const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];
      resolve(respostaAleatoria);
    }, 1000);
  });
}