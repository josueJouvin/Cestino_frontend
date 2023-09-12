import {
  Page,
  Text,
  Document,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const Pdf = ({ pdf }) => {
  const styles = StyleSheet.create({
    page: {
      height: "100vh",
      width: "100%",
      position: "relative",
    },
    container: {
      width: "80%",
      margin: "0 auto",
      height: "100%"
    },
    header: {
      width: "100%",
      padding: "20px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "3px solid #000",
      fontWeight: "900",
      color: "#3F620C",
      fontSize: "25px",
    },
    headerLogo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "5px",
      alignItems: "center",
      fontSize: "22px",
    },
    imageBg: {
      position: "relative",
      top: "-250px",
      left: "280px",
      transform: "rotate(50deg)",
      opacity: "0.35",
      height: "200px",
      width: "200px",
    },
    backgroundImage: {
      position: "absolute",
      top: "800px",
      left: 0,
      width: "100%",
    },
    cestino: {
      margin: "0 0 20px 0",
      border: "2px solid #000",
      display: "flex",
      gap: "20px",
      height:"100%"
    },
    cestinoTitle: {
      padding: "15px 0",
      fontSize: "22px",
    },
    cestinoImg: {
      width: "200px",
      heigh: "200px",
    },
    cestinoProducts: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontSize: "16px",
    },
    cestinoTotal: {
      fontSize: "20px",
    },
  });

  function webpToPng(img) {
    return img.replace(/\.webp$/, ".png");
  }

  return (
    <Document title="Cestino">
      <Page size="A4" style={styles.page}>
      <Image src={"/svg.png"} style={styles.backgroundImage}/>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{"Nombre de empresa"}</Text>
            <View style={styles.headerLogo}>
              <Image
                src="/Cestino.png"
                style={{ width: "35px", height: "35px" }}
              />
              <Text>{"Cestino"}</Text>
            </View>
          </View>

          {pdf.map((cestino) => (
            <View key={cestino._id}>
              <Text style={styles.cestinoTitle}>{cestino.name}</Text>
              <View style={styles.cestino}>
                <Image
                  src={
                    cestino.image
                      ? webpToPng(cestino.image.secure_url)
                      : "/Cestino.png"
                  }
                  style={styles.cestinoImg}
                />
                <View style={styles.cestinoProducts}>
                  {cestino.products.map((product) => (
                    <Text key={product._id}>
                      - {product.nameproduct} {product.quantity}{" "}
                      {product.unitmeasure}
                    </Text>
                  ))}
                </View>
                <Text style={styles.cestinoTotal}>
                  $ {cestino.total.toFixed(2)}
                </Text>
              </View>
              <Image
                src={
                  cestino.image
                    ? webpToPng(cestino.image.secure_url)
                    : "/Cestino.png"
                }
                style={styles.imageBg}
              />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
