import express from 'express';
import db from './db.js';
import passport from 'passport';
import Authentication from "./auth.js"
import path from 'path';
import fs from 'fs';

const dirname = fs.realpathSync('.');

class DictionaryBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));

    app.use(express.urlencoded({extended: false}));
    const authentication = new Authentication(app);

    app.get('/lookup/:word', authentication.checkAuthenticated, this.doLookup);
    app.post('/save/', authentication.checkAuthenticated, this.doSave);
    app.delete('/delete/', authentication.checkAuthenticated, this.doDelete);

    app.get('/login/', this.login);
    app.post('/login/', passport.authenticate('local', {failureRedirect: '/login'}));
    app.post('/register/', this.doRegister);
    app.get('/', authentication.checkAuthenticated, this.goHome);
    app.get('/logout', this.doLogout);
    
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async login(req,res) {
    res.sendFile(path.join(dirname, "public/login.html"));
  }

  async goHome(req, res) {
    res.sendFile(path.join(dirname, "public/home.html"));
  }
  
  async doLookup(req, res) {
   const word = req.params.word.toLowerCase();
   const query = { word: word };
   const collection = db.collection("dict");
   const stored = await collection.findOne(query);
   const response = {
     word: word,
     definition: stored ? stored.definition : ''
   };
   res.json(response);
  }

  async doSave(req, res) {
    const word = req.body.word.toLowerCase();
    const query = { word: word };
    const update = { $set: { definition: req.body.definition } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }

  async doDelete(req, res) {
    const word = req.body.word.toLowerCase();
    const query = { word: word };
    const collection = db.collection("dict");
    const deleted = await collection.findOneAndDelete(query);
    res.json(deleted.value);
  }

  async doRegister(req, res) {
    const query = { user: req.body.username };
    const update = { $set: { password: req.body.password } };
    const params = { upsert: true };
    const collection = db.collection("users");
    await collection.updateOne(query, update, params);
    res.redirect('/logout');
  }
 
  doLogout(req, res){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy(function(err) {
        if (err) {
          console.error('Error destroying session:', err);
        }
        res.clearCookie('connect.sid'); // Opcional: limpiar la cookie de sesión
        res.redirect('/login');
      });
    });
      }

}

new DictionaryBackendServer();