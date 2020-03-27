import { Request, Response, response } from "express";
import pool from "../database";

class GamesController {
  public async list(req: Request, res: Response) {
    const games = await pool.query("select * from game");
    res.json(games);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const game = await pool.query("select * from game where id = ?", [id]);
    if (game.length > 0) {
      return res.json(game[0]);
    } else {
      res.status(404).json({ message: "The game doesn't exists" });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query("INSERT INTO game SET ?", [req.body]);
    res.json({ message: "Game Saved" });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("update game set ? where id = ?", [req.body, id]);
    res.json({message: "The Game was update"});
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("delete from game where id = ?", [id]);
    res.json({ message: "The game was deleted" });
  }
}

const gamesController = new GamesController();
export default gamesController;
