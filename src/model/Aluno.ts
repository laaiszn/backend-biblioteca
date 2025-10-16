class Aluno {
  private id_aluno: number;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private nascimento_data: Date;
  private endereco: string;
  private email: string;
  private celular: string;

  constructor(
    _id_aluno: number,
    _ra: string,
    _nome: string,
    _sobrenome: string,
    _nascimento_data: Date,
   _endereco: string,
    _email: string,
   _celular: string
  ) {
    this.id_aluno = _id_aluno;
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.nascimento_data = _nascimento_data;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

 public getIdAluno(): number {
    return this.id_aluno;
  }

  public getRa(): string {
    return this.ra;
  }

  public getNome(): string {
    return this.nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }

  public getNascimentoData(): Date {
    return this.nascimento_data;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCelular(): string {
    return this.celular;
  }

  public setIdAluno(id_aluno: number): void {
    this.id_aluno = id_aluno;
  }

  public setRa(ra: string): void {
    this.ra = ra;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setSobrenome(sobrenome: string): void {
    this.sobrenome = sobrenome;
  }

  public setNascimentoData(nascimento_data: Date): void {
    this.nascimento_data = nascimento_data;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setCelular(celular: string): void {
    this.celular = celular;
  }
}

export default Aluno;