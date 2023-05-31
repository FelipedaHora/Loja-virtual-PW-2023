INSERT INTO `estado` (`id`, `nome`, `sigla`) VALUES (1, 'PARANÁ', 'PR');
INSERT INTO `cidade` (`id`, `nome`, `estado_id`) VALUES (1,'PARANAVAÍ', 1);
INSERT INTO `pessoa` (`id`, `name`, `cpf`,`email`,`endereco`,`cep`, `cidade_id`) VALUES (1,"Felipe da Hora","748.578.010-78", "lipedahora2000@hotmail.com","Rua Morumbi No Centro do Morumbi","87703500",1);
INSERT INTO `permissao` (`id`, `nome`) VALUES (1, "Administrador");
INSERT INTO `permissao_pessoa` (`id`,`permissao_id`, `pessoa_id`) VALUES (1,1,1);