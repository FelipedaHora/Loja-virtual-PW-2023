package com.LojaVirtual.LojaVirtual.controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.LojaVirtual.LojaVirtual.entity.Mensagem;

@Controller
public class MensagemController {
    
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Mensagem sendMessage(Mensagem message) {
        return new Mensagem("Nova mensagem: " + message.getContent());
    }
}
