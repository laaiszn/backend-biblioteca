export interface LivroDTO {
  titulo: string;
  autor: string;
  editora: string;
  ano_publicacao: number;
  isbn: string;
  quant_total: number;
  quant_disponivel: number;
  valor_aquisicao: number;
  status_livro_emprestado: string;
}
