class Livro {
  private id_livro: number;
  private titulo: string;
  private autor: string;
  private editora: string;
  private ano_publicacao: number;
  private isbn: string;
  private quant_total: number;
  private quant_disponivel: number;
  private valor_aquisicao: number;
  private status_livro_emprestado: string;

  constructor(
    _id_livro: number,
    _titulo: string,
    _autor: string,
    _editora: string,
    _ano_publicacao: number,
    _isbn: string,
    _quant_total: number,
    _quant_disponivel: number,
    _valor_aquisicao: number,
    _status_livro_emprestado: string
  ) {
    this.id_livro = _id_livro;
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.ano_publicacao = _ano_publicacao;
    this.isbn = _isbn;
    this.quant_total = _quant_total;
    this.quant_disponivel = _quant_disponivel;
    this.valor_aquisicao = _valor_aquisicao;
    this.status_livro_emprestado = _status_livro_emprestado;
  }

  public getIdLivro(): number {
    return this.id_livro;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public getEditora(): string {
    return this.editora;
  }

  public getAnoPublicacao(): number {
    return this.ano_publicacao;
  }

  public getIsbn(): string {
    return this.isbn;
  }

  public getQuantTotal(): number {
    return this.quant_total;
  }

  public getQuantDisponivel(): number {
    return this.quant_disponivel;
  }

  public getValorAquisicao(): number {
    return this.valor_aquisicao;
  }

  public getStatusLivroEmprestado(): string {
    return this.status_livro_emprestado;
  }


  public setIdLivro(id_livro: number): void {
    this.id_livro = id_livro;
  }

  public setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public setAutor(autor: string): void {
    this.autor = autor;
  }

  public setEditora(editora: string): void {
    this.editora = editora;
  }

  public setAnoPublicacao(ano_publicacao: number): void {
    this.ano_publicacao = ano_publicacao;
  }

  public setIsbn(isbn: string): void {
    this.isbn = isbn;
  }

  public setQuantTotal(quant_total: number): void {
    this.quant_total = quant_total;
  }

  public setQuantDisponivel(quant_disponivel: number): void {
    this.quant_disponivel = quant_disponivel;
  }

  public setValorAquisicao(valor_aquisicao: number): void {
    this.valor_aquisicao = valor_aquisicao;
  }

  public setStatusLivroEmprestado(status_livro_emprestado: string): void {
    this.status_livro_emprestado = status_livro_emprestado;
  }
}

export default Livro;