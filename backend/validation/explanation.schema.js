const {z}=require("zod");

const explainSchema=z.object({
    "content":z
    .string()
    .min(1,"content cannot be empty")
    .max(3000,"content to long")
    ,
    "type":z
    .enum(["code","theory","logic"])
})

module.exports={explainSchema};