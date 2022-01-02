# Cadastro do veículo

**Requisitos Funcionais**
- Deve ser possível cadastrar um novo veículo.

**Regras de Negócios**
- Não deve ser possível cadastrar um veículo com uma placa já existente.
- O veículo deve ser cadastrado com disponibilidade, por padrão.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de veículos

**Requisitos Funcionais**
- Deve ser possível listar todos os veículos disponíveis.
- Deve ser possível listar todos os veículos disponíveis pela categoria.
- Deve ser possível listar todos os veículos disponíveis pelo nome da categoria.
- Deve ser possível listar todos os veículos disponíveis pelo nome da marca.
- Deve ser possível listar todos os veículos disponíveis pelo nome do veículo.

**Regras de Negócios**
- O usuário não precisa estar logado no sistema.

# Cadastro de Especificações

**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um veículo.

**Regras de Negócios**
- Não deve ser possível cadastrar uma especificação para um veículo não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo veículo.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do veículo

**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do veículo.

**Requisitos Não Funcionais**
- Utilizar o multer para upload dos arquivos.

**Regras de Negócios**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo veículo.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel do veículo

**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel.

**Regras de Negócios**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo veículo.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.


# Devolução do veículo

**Requisitos Funcionais**
- Deve ser possível realizar a devolução de um veículo.

**Regras de Negócios**
- Se o veículo for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o veículo deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.


# Listagem de Aluguéis do usuário

**Requisitos Funcionais**
- Deve ser possível realizar a busca de todos os alugueis do usuário.

**Regras de Negócios**
- O usuário deve estar logado na aplicação.


# Recuperar Senha

**Requisitos Funcionais**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- o usuário deve conseguir inserir uma nova senha

**Regras de Negócios**
- O usuário precisa informar uma nova senha
- o link enviado para a recurperação deve expirar em 3 horas
