import {contract} from '@stellar/stellar-sdk'

export default class ContractClient extends contract.Client {
    options

    constructor(options) {
        super(new contract.Spec(["AAAAAgAAAAAAAAAAAAAABUFzc2V0AAAAAAAAAgAAAAEAAAAAAAAAB1N0ZWxsYXIAAAAAAQAAABMAAAABAAAAAAAAAAVPdGhlcgAAAAAAAAEAAAAR",
            "AAAAAQAAAAAAAAAAAAAAC1RpY2tlckFzc2V0AAAAAAIAAAAAAAAABWFzc2V0AAAAAAAH0AAAAAVBc3NldAAAAAAAAAAAAAAGc291cmNlAAAAAAAQ",
            "AAAAAQAAAAAAAAAAAAAADFN1YnNjcmlwdGlvbgAAAAkAAAAAAAAAB2JhbGFuY2UAAAAABgAAAAAAAAAEYmFzZQAAB9AAAAALVGlja2VyQXNzZXQAAAAAAAAAAAloZWFydGJlYXQAAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAABXF1b3RlAAAAAAAH0AAAAAtUaWNrZXJBc3NldAAAAAAAAAAABnN0YXR1cwAAAAAH0AAAABJTdWJzY3JpcHRpb25TdGF0dXMAAAAAAAAAAAAJdGhyZXNob2xkAAAAAAAABAAAAAAAAAAHdXBkYXRlZAAAAAAGAAAAAAAAAAd3ZWJob29rAAAAAA4=",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACQAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAAAAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAABAAAAAAAAABRTdWJzY3JpcHRpb25Ob3RGb3VuZAAAAAIAAAAAAAAADk5vdEluaXRpYWxpemVkAAAAAAADAAAAAAAAAA1JbnZhbGlkQW1vdW50AAAAAAAABAAAAAAAAAAQSW52YWxpZEhlYXJ0YmVhdAAAAAUAAAAAAAAAEEludmFsaWRUaHJlc2hvbGQAAAAGAAAAAAAAAA5XZWJob29rVG9vTG9uZwAAAAAABwAAAAAAAAAeSW52YWxpZFN1YnNjcmlwdGlvblN0YXR1c0Vycm9yAAAAAAAI",
            "AAAAAQAAAAAAAAAAAAAADkNvbnRyYWN0Q29uZmlnAAAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAAA2ZlZQAAAAAGAAAAAAAAAAV0b2tlbgAAAAAAABM=",
            "AAAAAQAAAAAAAAAAAAAAFlN1YnNjcmlwdGlvbkluaXRQYXJhbXMAAAAAAAYAAAAAAAAABGJhc2UAAAfQAAAAC1RpY2tlckFzc2V0AAAAAAAAAAAJaGVhcnRiZWF0AAAAAAAABAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVxdW90ZQAAAAAAB9AAAAALVGlja2VyQXNzZXQAAAAAAAAAAAl0aHJlc2hvbGQAAAAAAAAEAAAAAAAAAAd3ZWJob29rAAAAAA4=",
            "AAAAAwAAAAAAAAAAAAAAElN1YnNjcmlwdGlvblN0YXR1cwAAAAAAAgAAAAAAAAAGQWN0aXZlAAAAAAAAAAAAAAAAAAlTdXNwZW5kZWQAAAAAAAAB",
            "AAAAAAAAAAAAAAAGY29uZmlnAAAAAAABAAAAAAAAAAZjb25maWcAAAAAB9AAAAAOQ29udHJhY3RDb25maWcAAAAAAAA=",
            "AAAAAAAAAAAAAAAHc2V0X2ZlZQAAAAABAAAAAAAAAANmZWUAAAAABgAAAAA=",
            "AAAAAAAAAAAAAAAHdHJpZ2dlcgAAAAACAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAAAx0cmlnZ2VyX2hhc2gAAAPuAAAAIAAAAAA=",
            "AAAAAAAAAAAAAAAPdXBkYXRlX2NvbnRyYWN0AAAAAAEAAAAAAAAACXdhc21faGFzaAAAAAAAA+4AAAAgAAAAAA==",
            "AAAAAAAAAAAAAAAGY2hhcmdlAAAAAAABAAAAAAAAABBzdWJzY3JpcHRpb25faWRzAAAD6gAAAAYAAAAA",
            "AAAAAAAAAAAAAAATY3JlYXRlX3N1YnNjcmlwdGlvbgAAAAACAAAAAAAAABBuZXdfc3Vic2NyaXB0aW9uAAAH0AAAABZTdWJzY3JpcHRpb25Jbml0UGFyYW1zAAAAAAAAAAAABmFtb3VudAAAAAAABgAAAAEAAAPtAAAAAgAAAAYAAAfQAAAADFN1YnNjcmlwdGlvbg==",
            "AAAAAAAAAAAAAAAHZGVwb3NpdAAAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAPc3Vic2NyaXB0aW9uX2lkAAAAAAYAAAAAAAAABmFtb3VudAAAAAAABgAAAAA=",
            "AAAAAAAAAAAAAAAGY2FuY2VsAAAAAAABAAAAAAAAAA9zdWJzY3JpcHRpb25faWQAAAAABgAAAAA=",
            "AAAAAAAAAAAAAAAQZ2V0X3N1YnNjcmlwdGlvbgAAAAEAAAAAAAAAD3N1YnNjcmlwdGlvbl9pZAAAAAAGAAAAAQAAB9AAAAAMU3Vic2NyaXB0aW9u",
            "AAAAAAAAAAAAAAAHbGFzdF9pZAAAAAAAAAAAAQAAAAY=",
            "AAAAAAAAAAAAAAAFYWRtaW4AAAAAAAAAAAAAAQAAA+gAAAAT",
            "AAAAAAAAAAAAAAAHdmVyc2lvbgAAAAAAAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAADZmVlAAAAAAAAAAABAAAABg==",
            "AAAAAAAAAAAAAAAFdG9rZW4AAAAAAAAAAAAAAQAAABM="]), options)
        this.options = options
    }

    fromJSON = {
        config: (this.txFromJSON),
        set_fee: (this.txFromJSON),
        trigger: (this.txFromJSON),
        update_contract: (this.txFromJSON),
        charge: (this.txFromJSON),
        create_subscription: (this.txFromJSON),
        deposit: (this.txFromJSON),
        cancel: (this.txFromJSON),
        get_subscription: (this.txFromJSON),
        admin: (this.txFromJSON),
        version: (this.txFromJSON),
        fee: (this.txFromJSON),
        token: (this.txFromJSON)
    }
}