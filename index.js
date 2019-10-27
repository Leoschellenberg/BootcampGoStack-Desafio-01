const express = require ('express');

//iniciando Servidor
const server = express();

//Dependencia para o Servidor aceitar Requisições JSON
server.use(express.json());

//Variavel para armazenar contagem de Requisição
const Count = 0;

//Variavel para armazenar os dados que vão ser inseridos;
const projects = [];

//Middelware que faz verificação se ID existe dentro do Vetor
function checkProjectInArray(req, res, next){
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if(!project){
        return res.status(400).json({ error: 'Projeto não existe' });
    }

    return next();
}

//Middelware faz conta de cada Requisição feita no Server
function checkCountRequest(req, res, next){
    Count++;

    console.log(`Numero de requisições: ${Count}`);
  
    return next();
  }

//Cadastrar Projeto
server.post('/projects', (req, res) =>{
    const project = req.body;

    projects.push(project);

    return res.json(projects);
})

//Listar Todos Projetos

server.get('/projects',  (req, res) =>{
    return res.json(projects);
})

//Alterar um Projeto
server.put('/projects/:id', checkProjectInArray, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.title = title;
  
    return res.json(project);
})

//Deletar um projeto
server.delete('/projects/:id', checkProjectInArray, (req, res) =>{
    const { id } = req.params;

    const index = projects.findIndex(p => p.id == id);

    projects.splice(index, 1);

    return res.send();
})

//Cadastrar Tasks

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    const project = projects.find(p => p.id == id);
  
    project.tasks.push(title);
    
    return res.json(projects);
})

//Rota do Server
server.listen(3001);