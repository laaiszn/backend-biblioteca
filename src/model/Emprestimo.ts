class Emprestimo {
  private id_emprestimo: number;
  private id_aluno: number;
  private id_livro: number;
  private data_emprestimo: Date;
  private data_devolucao?: Date;
  private status_emprestimo: string;

  constructor(
    _id_emprestimo: number,
    _id_aluno: number,
    _id_livro: number,
    _data_emprestimo: Date,
    _status_emprestimo: string,
    _data_devolucao: Date
  ) {
    this.id_emprestimo = _id_emprestimo;
    this.id_aluno = _id_aluno;
    this.id_livro = _id_livro;
    this.data_emprestimo = _data_emprestimo;
    this.data_devolucao = _data_devolucao;
    this.status_emprestimo = _status_emprestimo;
  }

  // GETTERS
  public getIdEmprestimo(): number {
    return this.id_emprestimo;
  }

  public getIdAluno(): number {
    return this.id_aluno;
  }

  public getIdLivro(): number {
    return this.id_livro;
  }

  public getDataEmprestimo(): Date {
    return this.data_emprestimo;
  }

  public getDataDevolucao(): Date | undefined {
    return this.data_devolucao;
  }

  public getStatusEmprestimo(): string {
    return this.status_emprestimo;
  }

  // SETTERS
  public setIdEmprestimo(id_emprestimo: number): void {
    this.id_emprestimo = id_emprestimo;
  }

  public setIdAluno(id_aluno: number): void {
    this.id_aluno = id_aluno;
  }

  public setIdLivro(id_livro: number): void {
    this.id_livro = id_livro;
  }

  public setDataEmprestimo(data_emprestimo: Date): void {
    this.data_emprestimo = data_emprestimo;
  }

  public setDataDevolucao(data_devolucao: Date): void {
    this.data_devolucao = data_devolucao;
  }

  public setStatusEmprestimo(status_emprestimo: string): void {
    this.status_emprestimo = status_emprestimo;
  }
}

export default Emprestimo;