import type { AlunoDTO } from "../interface/AlunoDTO.js";
import DataBaseModel from "./DatabaseModel.js";

const database = new DataBaseModel().pool;

class Aluno {
  private idAluno: number = 0;
  private nome: string;
  private sobrenome: string;
  private ra: number;
  private dataNascimento: Date;
  private celular: string;
  private email: string;
  private endereco: string;

  /**
   * Construtor da classe Aluno
   * @param _nome Nome do Aluno
   * @param _cpf CPF do Aluno
   * @param _celular Telefone do Aluno
   * @param _email Email do Aluno
   * @param _endereco Endereco do Aluno
   */
  constructor(
    _nome: string,
    _sobrenome: string,
    _ra: number,
    _dataNascimento: Date,
    _celular: string,
    _email: string,
    _endereco: string
  ) {
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.ra = _ra;
    this.dataNascimento = _dataNascimento;
    this.celular = _celular;
    this.email = _email;
    this.endereco = _endereco;
  }

  public getIdAluno(): number {
    return this.idAluno;
  }

  public setIdAluno(idAluno: number): void {
    this.idAluno = idAluno;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }

  public setSobrenome(sobrenome: string): void {
    this.sobrenome = sobrenome;
  }

  public getra(): number {
    return this.ra;
  }

  public setra(ra: number): number {
    return (this.ra = ra);
  }

  public getdataNascimento(): Date {
    return this.dataNascimento;
  }

  public setdataNascimento(dataNascimento: Date): void {
    this.dataNascimento = dataNascimento;
  }

  public getemail(): string {
    return this.email;
  }

  public setemail(email: string): void {
    this.email = email;
  }

  public getendereco(): string {
    return this.endereco;
  }

  public setendereco(endereco: string): void {
    this.endereco = endereco;
  }

  public getcelular(): string {
    return this.celular;
  }

  public setcelular(celular: string): void {
    this.celular = celular;
  }

  static async listarAlunos(): Promise<Array<Aluno> | null> {
    try {
      let listaDeAlunos: Array<Aluno> = [];

      const querySelectAlunos = `SELECT * FROM Aluno;`;

      const respostaBD = await database.query(querySelectAlunos);

      respostaBD.rows.forEach((AlunoBD: any) => {
        const novoAluno: Aluno = new Aluno(
          AlunoBD.nome,
          AlunoBD.sobrenome,
          AlunoBD.ra,
          AlunoBD.data_nascimento,
          AlunoBD.celular,
          AlunoBD.email,
          AlunoBD.endereco
        );

        novoAluno.setIdAluno(AlunoBD.id_Aluno);

        listaDeAlunos.push(novoAluno);
      });

      return listaDeAlunos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }

  static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
    /*{
  "nome": "Ricardo",
  "sobrenome": "Cardoso",
  "data_nascimento": "1995-03-14",
  "endereco": "Rua General Osório, 165",
  "email": "ricardo_cardoso@usp.br",
  "celular": "67986786153"
  */
    try {
      const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                VALUES
                                ($1, $2, $3, $4, $5, $6)
                                RETURNING id_Aluno;`;

      const respostaBD = await database.query(queryInsertAluno, [
        aluno.nome.toUpperCase(),
        aluno.sobrenome.toUpperCase(),
        aluno.dataNascimento,
        aluno.endereco,
        aluno.email,
        aluno.celular,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].id_Aluno}`
        );

        return true;
      }

      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return false;
    }
  }

  static async listarAluno(idAluno: number): Promise<Aluno | null> {
    try {
      const querySelectAluno = `SELECT * FROM Alunos WHERE id_Aluno=$1;`;

      const respostaBD = await database.query(querySelectAluno, [idAluno]);

      if (respostaBD.rowCount !== 0) {
        const aluno: Aluno = new Aluno(
          respostaBD.rows[0].nome,
          respostaBD.rows[0].sobrenome,
          respostaBD.rows[0].ra,
          respostaBD.rows[0].dataNascimento,
          respostaBD.rows[0].celular,
          respostaBD.rows[0].email,
          respostaBD.rows[0].endereco
        );
        aluno.setIdAluno(respostaBD.rows[0].id_Aluno);

        return aluno;
      }

      return null;
    } catch (error) {
      console.error(`Erro ao buscar Aluno no banco de dados. ${error}`);
      return null;
    }
  }
}

export default Aluno;
