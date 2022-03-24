import pdf from "html-pdf";

class PDFController {
    index() {

        pdf.create("Meu nome é Victor!", {}).toFile("./meupdf.pdf", (err, res) => {

        });

    }

};

export default new PDFController();