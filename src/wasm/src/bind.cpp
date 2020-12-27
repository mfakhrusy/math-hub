// quick_example.cpp
#include <emscripten/bind.h>
// #include <iostream>

using namespace emscripten;

float lerp(float a, float b, float t) {
    // std::cout << a << std::endl;
    return (1 - t) * a + t * b;
};

int multiply(int x, int y) {
    return x * y;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("lerp", &lerp);
    function("multiply", &multiply);
}