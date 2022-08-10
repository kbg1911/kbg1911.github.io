class Bbs_Data {
  late String title;
  late String content;
  late String writer;

  Bbs_Data(this.title, this.content, this.writer);

  setData(String title, String content, String writer) {
    this.title = title;
    this.content = content;
    this.writer = writer;
  }
}