import type { LivroDTO } from "../interface/LivroDTO.js";
import DataBaseModel from "./DatabaseModel.js";

const database = new DataBaseModel().pool;

class Livro {
  private idLivro: number = 0;
  private titulo: string;
  private autor: string;
  private editora: string;
  private anoPublicacao: string;
  private isbn: string;
  private quantTotal: number;
  private quantDisponivel: number;
  private valorAquisicao: number;
  private statusLivroEmprestado: string;

  constructor(
    _titulo: string,
    _autor: string,
    _editora: string,
    _anoPublicacao: string,
    _isbn: string,
    _quantidadeTotal: number,
    _valorAquisicao: number,
    _statusLivroEmprestado: string
  ) {
    this.titulo = _titulo;
    this.autor = _autor;
    this.editora = _editora;
    this.anoPublicacao = _anoPublicacao;
    this.isbn = _isbn;
    this.quantTotal = _quantidadeTotal;
    this.quantDisponivel = _quantidadeTotal;
    this.valorAquisicao = _valorAquisicao;
    this.statusLivroEmprestado = _statusLivroEmprestado;
  }

  public getIdLivro(): number {
    return this.idLivro;
  }

  public setIdLivro(idLivro: number): void {
    this.idLivro = idLivro;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public setAutor(autor: string): void {
    this.autor = autor;
  }

  public getEditora(): string {
    return this.editora;
  }

  public setEditora(editora: string): void {
    this.editora = editora;
  }

  public getAnoPublicacao(): string {
    return this.anoPublicacao;
  }

  public setAnoPublicacao(anoPublicacao: string): void {
    this.anoPublicacao = anoPublicacao;
  }

  public getIsbn(): string {
    return this.isbn;
  }

  public setIsbn(isbn: string): void {
    this.isbn = isbn;
  }

  public getQuantidadeTotal(): number {
    return this.quantTotal;
  }

  public setQuantidadeTotal(quantidadeTotal: number): void {
    this.quantTotal = quantidadeTotal;
  }

  public getQuantidadeDisponivel(): number {
    return this.quantDisponivel;
  }

  public setQuantidadeDisponivel(quantidadeDisponivel: number): void {
    this.quantDisponivel = quantidadeDisponivel;
  }

  public getValorAquisicao(): number {
    return this.valorAquisicao;
  }

  public setValorAquisicao(valorAquisicao: number): void {
    this.valorAquisicao = valorAquisicao;
  }

  public getStatusLivroEmprestado(): string {
    return this.statusLivroEmprestado;
  }

  public setStatusLivroEmprestado(status: string): void {
    this.statusLivroEmprestado = status;
  }

  static async listarLivros(): Promise<Array<Livro> | null> {
    try {
      const listaDeLivros: Array<Livro> = [];
      const querySelectLivros = `SELECT * FROM Livro;`;
      const respostaBD = await database.query(querySelectLivros);

      respostaBD.rows.forEach((respostaBD: any) => {
        const novoLivro: Livro = new Livro(
          respostaBD.titulo,
          respostaBD.autor,
          respostaBD.editora,
          respostaBD.ano_publicacao,
          respostaBD.isbn,
          respostaBD.quant_total,
          respostaBD.valor_aquisicao,
          respostaBD.status_livro_emprestado
        );

        novoLivro.setIdLivro(respostaBD.id_livro);
        listaDeLivros.push(novoLivro);
      });

      return listaDeLivros;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return null;
    }
  }

  static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
    try {
      const queryInsertLivro = `
        INSERT INTO Livro (
          titulo, autor, editora, ano_publicacao,
          isbn, quant_total, quant_disponivel,
          valor_aquisicao, status_livro_emprestado
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id_livro;
      `;

      const respostaBD = await database.query(queryInsertLivro, [
        livro.titulo,
        livro.autor,
        livro.editora,
        livro.ano_publicacao,
        livro.isbn,
        livro.quant_total,
        livro.quant_disponivel,
        livro.valor_aquisicao,
        livro.status_livro_emprestado,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Erro ao cadastrar Livro no banco de dados. ${error}`);
      return false;
    }
  }

  static async listarLivro(idLivro: number): Promise<Livro | null> {
    try {
      const querySelectLivro = `SELECT * FROM Livro WHERE id_livro = $1;`;
      const respostaBD = await database.query(querySelectLivro, [idLivro]);

      if (respostaBD.rowCount !== 0) {
        const livroBD = respostaBD.rows[0];
        const livro: Livro = new Livro(
          livroBD.titulo,
          livroBD.autor,
          livroBD.editora,
          livroBD.ano_publicacao,
          livroBD.isbn,
          livroBD.quant_total,
          livroBD.valor_aquisicao,
          livroBD.status_livro_emprestado
        );

        livro.setIdLivro(livroBD.id_livro);

        return livro;
      }

      return null;
    } catch (error) {
      console.error(`Erro ao buscar Livro no banco de dados. ${error}`);
      return null;
    }
  }
}

export default Livro;
