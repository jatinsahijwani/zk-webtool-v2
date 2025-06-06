template LessThan10() {
    signal input in;
    signal output out;

    // out = 1 if in < 10, else 0
    out <== in < 10;
}

component main = LessThan10();