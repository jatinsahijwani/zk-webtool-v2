pragma circom 2.0.0;

template IsEqual42() {
    signal input in;
    signal output out;

    // Check if input equals 42
    out <== in === 42 ? 1 : 0;

    // Enforce out == 1 (i.e. in must be 42)
    assert(out == 1);
}

component main = IsEqual42();
