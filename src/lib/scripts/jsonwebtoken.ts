import jwt from "jsonwebtoken";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA861rGiEMuk6D/+0Tgs5KbSA2HHTgJfn941r75bwj+IywW1EI
g7G45ubW32a6Z6Jodx9DzMNGe5gCIgnU28z0mGEAOqdQ1htcxnSWJQFGZYSC8Vnc
dU0LyRXJkuYbtp1aMgUumOzlncrwb2o42M+hQolMAllZ74xxzPLGN1azqfjjRkQm
7vn7AHLEVtzhLJLDfnxWnh5TCXzxXlAEzXTVQ5EwauMxQrVCujiKWxkYtZ7MEdVC
irXnq7jl97djMu4L0G/ECukVPeLyo6KBv8ZNdQ2X+NxK0YCV3Ie2wrctxGE2oYTq
O1P7J2fenVer/ygp2bi26sBYqhUgZCo54XB74QIDAQABAoIBAGrg8G4IevWohHsX
OAySgNB2ZWV72eiuSq6S9JNiPwDAbIXQ+AQTSn90VmCsRSw5bsp42xsPt3V0SdM2
LretoMbJHPmc83bFj563+jcG5SKXyXskp+6HOZkcRkp5RUSGpc30ueh3V4srPOQR
Whe2kguF/uG04R6RokR7Y3dYPvtYhPW6tl80vXf13VuK6wUiw7+uwuKpUXGesEGb
fHnQUyfXeYbxdEZp0ahYsQ7AM0VrMKIy7fZfEea3qNajB0zfNTHXNY9Dj6WFXwFy
0gT9DDySc7sWZzTgBVQJ3SiPTG1hQldZ1PPsrIZCF6/h9IJvbUojNwUyARzjrymu
b7OUSTECgYEA+eZsiV7vizAI7DsHy8Ld+ybrFTqe29HHL3Axq0WLRKnVj8DKoXYO
ACoCpfMVs5m2J2r8djPiTPyM5dHgdZeKMreubBGz0DKbKLpMyDNJcNQ3hJID9U/z
6SUX+XYqJswWjfvgQRmJfuPS0xf2DbKOhmOuTarl6vYhd406O/kqKuUCgYEA+aAc
MKKnMT5zpZBqwEo1O72dk30FOPBxnp/h7m9Q6L2eOdeWYd0ujsmURfdp6RkJdf/L
QDqaf0hgAY1jvWZ3d5XqRYZvzNBQd59hwKO7RbiitDFhu0e4tCAvmPD+g+MJOsmR
a9W6oQBdKTaoCKZj1N/4yPLTb0V1SM3W1pHg8U0CgYEAt0Arcwi07AJLaL9Y1iiN
kzBUzvpvp45LXBQPuCKFH9LSklmzvXbOiXxE+OAql8st8fXYL+2YExBXWefviwuX
Ad4D/6dzjkat1M3YpC5Hun9EPui8ElWQ7PSQghQOkOiz2WZMajCJzQzPepBllGHN
der+1GFvvD7FB9/+RiBOtakCgYBU3dtXqaTf+BSHQF8aut/4TJHrF8ETx6NJQ6Aj
WRMP3Y+SqLoG0ZTHlL7lPqVyS0HNLUbjskjeZzPEs1YqiVCqhnxcYMVXw6bn1Hb+
cGv12zztuDA65Lpl+t9TxvMw0ZpMs0TOfZ5yqFYD8gIU1sTwFalWYEAD/4BNXTXi
QzxPrQKBgH30xCMdrbH3PT5n2FRpkvz1/q2Tpg3z0Gi3Exs3dhTGFp4qibmel34u
h55Epwh44XM9ZYuCLEurzdXLv0Ge35wYW7IR/CKb/kbJTQHWoka5XIJLf/FFGXUF
xaT2c5zAcW3I8N4Q3TRDP5uiSCSMVyEFcwGCFlGHSjn7m0a+MIsw
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA861rGiEMuk6D/+0Tgs5K
bSA2HHTgJfn941r75bwj+IywW1EIg7G45ubW32a6Z6Jodx9DzMNGe5gCIgnU28z0
mGEAOqdQ1htcxnSWJQFGZYSC8VncdU0LyRXJkuYbtp1aMgUumOzlncrwb2o42M+h
QolMAllZ74xxzPLGN1azqfjjRkQm7vn7AHLEVtzhLJLDfnxWnh5TCXzxXlAEzXTV
Q5EwauMxQrVCujiKWxkYtZ7MEdVCirXnq7jl97djMu4L0G/ECukVPeLyo6KBv8ZN
dQ2X+NxK0YCV3Ie2wrctxGE2oYTqO1P7J2fenVer/ygp2bi26sBYqhUgZCo54XB7
4QIDAQAB
-----END PUBLIC KEY-----`

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
    try {
      const decoded = jwt.verify(token, publicKey);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e: any) {
      console.error(e);
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }