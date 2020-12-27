// #include <iostream>

extern "C" {
  int add(int x, int y) {
    return x + y;
  }
}

extern "C" {
  int getFirstItem(int arr[]) {
    // std::cout << arr << std::endl;

    return arr[0];
  };
}