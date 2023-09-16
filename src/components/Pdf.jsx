import {
  Page,
  Text,
  Document,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const Pdf = ({ pdf, auth }) => {
  const styles = StyleSheet.create({
    page: {
      height: "100vh",
      width: "100%",
      flexDirection: "column",
      position: "relative", 
      backgroundColor: "#ccf0d59b"
    },
    container: {
      width: "80%",
      margin: "0 auto",
      zIndex: "100",
      height:"100%",
      position: "relative"
    },
    header: {
      width: "100%",
      padding: "25px 0 20px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #242424",
      color: "#011f00",
      fontSize: "21px",
    },
    headerLogo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "5px",
      alignItems: "center",
    },
    imageBg: {
      position: "absolute",
      bottom: "250",
      left: "300px",
      transform: "rotate(30deg)",
      opacity: "0.25",
      height: "130px",
      width: "130px",
      borderRadius: "10%"
    },
    backgroundImage: {
      position: "absolute",
      bottom: "-50",
      left: "-80px",
      width: "700px",
      zIndex: "-10",
      opacity: "0.35",
      transform: "rotate(-10deg)",
    },
    cestino: {
      margin: "0 0 20px 0",
      display: "flex",
      gap: "20px",
      height: "100%"
    },
    cestinoTitle: {
      padding: "30px 0 20px 0",
      fontSize: "24px",
      fontWeight: "black"
    },
    cestinoImg: {
      width: "180px",
      height: "180px",
      margin: "0 auto",
      borderRadius: "3%"
    },
    cestinoProducts: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      fontSize: "16px",
    },
    cestinoTotal: {
      fontSize: "22px",
      padding: "5px",
      color: "#bd0c0c"
    },
  });

  function webpToPng(img) {
    return img.replace(/\.webp$/, ".png");
  }

  return (
    <Document title={auth ? auth : "Cestino"}>
      <Page size="A4" style={styles.page}>
        {pdf.map((cestino) => (
          <View key={cestino._id} style={styles.container}>
            <Image src={"/svg.png"} style={styles.backgroundImage} />
            <View style={styles.header}>
              <Text>{auth ? auth : "Cestino"}</Text>
              <View style={styles.headerLogo}>
                <Image
                  src="/Cestino.png"
                  style={{ width: "40px", height: "40px" }}
                />
                <Text>{"Cestino"}</Text>
              </View>
            </View>
            <View>
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
                      - {product.nameproduct} {product.quantity} {product.unitmeasure}
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
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default Pdf;
