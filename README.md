# Cadastro do veículo

**Requisitos Funcionais**
Deve ser possível cadastrar um novo veículo.

**Regras de Negócios**
Não deve ser possível cadastrar um veículo com uma placa já existente.
O veículo deve ser cadastrado com disponibilidade, por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pela categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do veículo.

**Regras de Negócios**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificações

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um veículo.

**Regras de Negócios**
Não deve ser possível cadastrar uma especificação para um veículo não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo veículo.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do veículo

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do veículo.

**Requisitos Não Funcionais**
Utilizar o multer para upload dos arquivos.

**Regras de Negócios**
O usuário deve poder cadastrar mais de uma imagem para o mesmo veículo.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel do veículo

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regras de Negócios**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo veículo.
O usuário deve estar logado na aplicação
