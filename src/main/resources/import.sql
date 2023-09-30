INSERT INTO `estado` (`id`, `nome`, `sigla`) VALUES (1, 'PARANA', 'PR');

INSERT INTO `permissao` (`id`, `nome`) VALUES (1, 'Administrador');

INSERT INTO `pessoa` (`id`, `nome`) VALUES (1, 'Pedro');

INSERT INTO `permissao_pessoa` (`id`, `id_pessoa`, `id_permissao`) VALUES (1,1,1);

INSERT INTO `cidade` (`id`, `nome`, `id_estado` ) VALUES (1, 'Paranavaí', 1);