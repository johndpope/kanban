package cn.kurisu9.controller;

import cn.kurisu9.example.Example;
import cn.kurisu9.loop.bootstrap.ServerBoot;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author kurisu9
 * @description 测试使用的controller
 * @date 2018/9/3 17:28
 **/
@RestController
@RequestMapping(("/test"))
public class TestController {

    @RequestMapping(path = "/shutdown", method = RequestMethod.GET)
    public void shutdownServer() {
        ServerBoot.shutdown();
    }

    @RequestMapping(path = "/protoBuf", method = RequestMethod.GET)
    public void testProtoBuf() {
        Example.LoginRequest.Builder builder = Example.LoginRequest.newBuilder();
        builder.setUuid(1);
        Example.LoginRequest request = builder.build();
        System.out.println(request);
    }
}
