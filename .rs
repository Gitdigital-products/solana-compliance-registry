use solana_compliance_registry::ComplianceRegistryClient;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = ComplianceRegistryClient::new("registry.json").await?;
    println!("{:?}", client.list_entries());
    Ok(())
}