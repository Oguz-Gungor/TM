export default function withLayout(Layout, Component) {
  return (props) => {
    return <Layout>
      <Component {...props} />
    </Layout>;
  };
}
