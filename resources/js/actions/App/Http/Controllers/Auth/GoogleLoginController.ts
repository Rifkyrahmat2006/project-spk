import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\GoogleLoginController::authenticate
 * @see app/Http/Controllers/Auth/GoogleLoginController.php:17
 * @route '/auth/google/authenticate'
 */
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

authenticate.definition = {
    methods: ["post"],
    url: '/auth/google/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\GoogleLoginController::authenticate
 * @see app/Http/Controllers/Auth/GoogleLoginController.php:17
 * @route '/auth/google/authenticate'
 */
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\GoogleLoginController::authenticate
 * @see app/Http/Controllers/Auth/GoogleLoginController.php:17
 * @route '/auth/google/authenticate'
 */
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\GoogleLoginController::authenticate
 * @see app/Http/Controllers/Auth/GoogleLoginController.php:17
 * @route '/auth/google/authenticate'
 */
    const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: authenticate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\GoogleLoginController::authenticate
 * @see app/Http/Controllers/Auth/GoogleLoginController.php:17
 * @route '/auth/google/authenticate'
 */
        authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate.url(options),
            method: 'post',
        })
    
    authenticate.form = authenticateForm
const GoogleLoginController = { authenticate }

export default GoogleLoginController