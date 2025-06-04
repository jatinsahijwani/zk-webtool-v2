template IsEqual42() {
    signal input in;
    signal output out;
    out <== in === 42 ? 1 : 0;
    assert(out == 1);
}

component main = IsEqual42();
