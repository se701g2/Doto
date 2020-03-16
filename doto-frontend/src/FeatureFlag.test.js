import * as configcat from "configcat-js";

test('false feature flags are functional', async () => {
    let configCatClient = configcat.createClient("9sPXCALhtpYo4pqg4g3vDQ/KtGlH7JdfUunUsbdCUwWaw");
    const isFeatureFlagFalse = await configCatClient.getValueAsync("featureflagfalse", false);
    console.log(isFeatureFlagFalse);
    expect(isFeatureFlagFalse).toBe(false);
});

test('true feature flags are functional', async () => {
    let configCatClient = configcat.createClient("9sPXCALhtpYo4pqg4g3vDQ/KtGlH7JdfUunUsbdCUwWaw");
    const isFeatureFlagTrue = await configCatClient.getValueAsync("featureflagtrue", true);
    expect(isFeatureFlagTrue).toBe(true);
});
