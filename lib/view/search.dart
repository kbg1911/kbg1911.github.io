import 'package:flutter/material.dart';

class Search extends StatelessWidget {
  const Search({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Second Route"),
      ),
      // body: Center(
      //   child: RaisedButton(
      //     onPressed: () {
      //       Navigator.pop(context);
      //     },
      //     child: const Text('Go back!'),
      //   ),
      // ),
    );
  }
}