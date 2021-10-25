test('active tool is the most recently clicked tool', () => {
    let tool = new Tool();
    expect(tool.getActiveTool()).toEqual("rectangle"); // default setting
});