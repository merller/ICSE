while True:
    # 获取用户输入
    xxx = input("请输入你想替换xxx的内容：")
    yyy = input("请输入你想替换yyy的内容：")
    
    # 模板字符串
    template = f"query: {xxx} iot scene. u can use any iot devices or web services. this scene will take place in a {yyy}"
    
    # 输出结果
    print(template)
