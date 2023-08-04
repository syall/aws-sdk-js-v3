package software.amazon.smithy.aws.typescript.codegen.auth;

import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import software.amazon.smithy.aws.traits.ServiceTrait;
import software.amazon.smithy.aws.traits.auth.SigV4Trait;
import software.amazon.smithy.model.Model;
import software.amazon.smithy.model.shapes.ServiceShape;
import software.amazon.smithy.typescript.codegen.CodegenUtils;
import software.amazon.smithy.typescript.codegen.TypeScriptCodegenContext;
import software.amazon.smithy.typescript.codegen.TypeScriptDependency;
import software.amazon.smithy.typescript.codegen.TypeScriptSettings;
import software.amazon.smithy.typescript.codegen.auth.AuthSchemeResolverGenerator;
import software.amazon.smithy.typescript.codegen.integration.RuntimeClientPlugin;
import software.amazon.smithy.typescript.codegen.integration.TypeScriptIntegration;
import software.amazon.smithy.typescript.codegen.integration.RuntimeClientPlugin.AuthSchemeParameter;
import software.amazon.smithy.utils.StringUtils;

public class SigV4AuthIntegration implements TypeScriptIntegration {
    @Override
    public List<RuntimeClientPlugin> getClientPlugins() {
        return List.of(
                RuntimeClientPlugin.builder()
                        .servicePredicate((m, s) -> s.hasTrait(SigV4Trait.class))
                        .authSchemeServiceNameOverride(SigV4AuthIntegration::getNormalizedSdkId)
                        .addAuthSchemeParameter(
                                new AuthSchemeParameter(
                                        "region", CodegenUtils.STRING_SYMBOL,
                                        "config", "region",
                                        false, true))
                        .build());
    }

    private static String getNormalizedSdkId(Model model, TypeScriptSettings settings) {
        String sdkId = settings.getService(model)
                .expectTrait(ServiceTrait.class)
                .getSdkId();
        return Arrays.asList(sdkId.split(" ")).stream()
                .map(StringUtils::capitalize)
                .collect(Collectors.joining(""));
    }

    @Override
    public void customize(TypeScriptCodegenContext codegenContext) {
        Model model = codegenContext.model();
        if (!model.isTraitApplied(SigV4Trait.class)) {
            return;
        }
        TypeScriptSettings settings = codegenContext.settings();
        ServiceShape service = settings.getService(model);

        codegenContext.writerDelegator().useFileWriter(
                Paths.get(CodegenUtils.SOURCE_FOLDER, AuthSchemeResolverGenerator.AUTH_FOLDER,
                        AuthSchemeResolverGenerator.AUTH_SCHEME_RESOLVER_FILE).toString(),
                writer -> {
                    writer.openBlock("function $L(authParameters: $L): AuthOption {",
                            "}",
                            new Object[] {
                                    "get_" + SigV4Trait.ID.toString().replace(".", "_").replace("#", "_")
                                            + "AuthOption",
                                    getNormalizedSdkId(model, settings) + "AuthSchemeParameters"
                            },
                            () -> {
                                writer.openBlock("return {", "};", () -> {
                                    writer.write("schemeId: $S,", SigV4Trait.ID);
                                    writer.openBlock("signerProperties: {", "},", () -> {
                                        writer.write("name: $S,", service.expectTrait(SigV4Trait.class).getName());
                                        writer.addImport("expectString", null, TypeScriptDependency.AWS_SMITHY_CLIENT);
                                        writer.write("region: expectString(authParameters.region),");
                                    });
                                });
                            });
                });
    }
}
